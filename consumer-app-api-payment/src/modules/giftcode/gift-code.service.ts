import { HttpStatus, Inject } from "@nestjs/common";
import { GiftCodeRepository } from "./gift-code.repository";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { GiftCodeDto } from "./dto/giftcode.dto";
import GiftCode from "./interfaces/giftcode.interface";
import { OfferCodeRepository } from "../offercode/offercode.repository";
import { GiftCodeTemplateService } from "../giftcodetemplate/gift-code-template.service";
import { Util } from "../../utils/util";
import { AccessLevel } from "../../enum";
import { AdaptyService } from "../adapty/adapty.service";
import { SubscriptionService } from "../subscription/subscription.service";
import { ConfigService } from "@nestjs/config";

export class GiftCodeService {
  constructor(
    @Inject('MAIL_SERVICE') private readonly emailService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly giftCodeRepository: GiftCodeRepository,
    private readonly offerCodeRepository: OfferCodeRepository,
    private readonly adaptyService: AdaptyService,
    private readonly codeTemplate: GiftCodeTemplateService,
    private readonly subscriptionService: SubscriptionService,
    private readonly configService: ConfigService
  ) {}

  async createGiftCode(buyerEmail: string, receiverEmail: string, template): Promise<GiftCode> {
    let code = {
      buyerEmail: buyerEmail,
      receiverEmail: receiverEmail,
      code: Util.generateCodeString(6).toString(),
      createdAt: new Date(),
      template: template,
      isActive: true
    }

    const giftCode = await this.giftCodeRepository.getByCode(code.code);
    const offerCode = await this.offerCodeRepository.getByCode(code.code);
    if ((giftCode && !giftCode.isUsed) || offerCode) {
      throw new RpcException({
        message: 'Gift code already exist.',
        statusCode: HttpStatus.CONFLICT,
      });
    } else {
      await this.sendEmailWithCode(code);
      return this.giftCodeRepository.save(code);
    }
  }

  async validateGiftCode(code: string): Promise<GiftCode> {
    let giftCode = await this.giftCodeRepository.getByCode(code);
    if (giftCode && giftCode.isActive && !giftCode.isUsed) {
      return giftCode;
    } else {
      return null;
    }
  }

  async redeemCode(code: string, user: string) {
    let giftCode = await this.giftCodeRepository.getByCode(code.toUpperCase());
    if (!!giftCode) {
      const template = await this.codeTemplate.get(giftCode.template.toString());
      const date = new Date();
      date.setMonth(date.getMonth()+template.months);
      if (giftCode.isActive && !giftCode.isUsed) {
        await this.subscriptionService.updateSubscription(user, date);
        await this.addGiftCodeToAdapty(user, giftCode);

        return await this.giftCodeRepository.update({ _id: giftCode._id, isUsed: true, receiver: user })
      } else {
        throw new RpcException({
          message: 'Cannot redeem code',
          statusCode: HttpStatus.BAD_REQUEST
        });
      }
    } else {
      throw new RpcException({
        message: 'Code doesn\'t exist',
        statusCode: HttpStatus.NOT_FOUND
      });
    }
  }

  async bulkCreate(receivers: string[], buyer: string, templateId: string) {
    if (!(await this.validateTemplate(templateId))) {
      throw new RpcException({
        message: 'Invalid template id',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    const giftCodesInfo = [];
    receivers.forEach((receiver) => {
      giftCodesInfo.push({
        buyerEmail: buyer,
        receiverEmail: receiver,
        code: Util.generateCodeString(6).toString(),
        createdAt: new Date(),
        template: templateId,
        isActive: true,
      });
    });
    const finalizeGenerationPromises = [];
    giftCodesInfo.forEach((giftCode) => {
      finalizeGenerationPromises.push(
        new Promise(async (resolve, reject) => {
          try {
            await this.sendEmailToReceiver(giftCode.receiverEmail, giftCode);
            await this.giftCodeRepository.save(giftCode);
            resolve(giftCode);
          } catch (e) {
            reject({
              error: e,
              giftCode: giftCode,
            });
          }
        }),
      );
    });
    const executeResults = await Promise.allSettled(finalizeGenerationPromises);
    const results = {
      successful: [],
      failed: [],
    };
    executeResults.forEach((result: any) => {
      if (result.status === 'fulfilled') {
        results.successful.push({
          receiver: result.value.receiverEmail,
          code: result.value.code
        });
      } else {
        results.failed.push(result.reason);
      }
    });
    return results;
  }

  protected async sendEmailWithCode(giftCode: GiftCodeDto) {
    await this.sendEmailToBuyer(giftCode.buyerEmail,  giftCode);
    await this.sendEmailToReceiver(giftCode.receiverEmail, giftCode);
  }

  protected async sendEmailToBuyer(buyerEmail : string, giftCode: GiftCodeDto) {
    return  this.emailService.send(
      { cmd: 'send-gift-code-email-buyer' },
      { body: { email: buyerEmail,
          subject: "Purchase Successful",
          code: giftCode
        }
      }).toPromise();
  }

  protected async sendEmailToReceiver(receiverEmail : string, giftCode: GiftCodeDto) {
    const redeemLink = await this.configService.get('GIFTCODE_REDEEM_LINK');
    const template = await this.codeTemplate.get(giftCode.template);
    return  this.emailService.send(
      { cmd: 'send-gift-code-email-receiver' },
      { body: { email: receiverEmail,
          subject: "Welcome to LUCA",
          code: {
            ...giftCode,
            redeemLink: redeemLink,
            months: template.months
          }
        }
      }).toPromise();
  }

  protected async getUserData(user: string) {
    return this.userService
      .send({ cmd: 'get' }, { params: { id: user } })
      .toPromise();
  }

  private async validateTemplate(id: string) {
    try {
      const template = await this.codeTemplate.get(id);
      return template && template.isActive;
    } catch (e) {
      return false;
    }
  }

  private async addGiftCodeToAdapty(user: string, giftCode: GiftCode) {
    const profile = await this.adaptyService.getProfile(user);
    if (!profile) {
      await this.adaptyService.createProfile(user);
    }
    await this.adaptyService.editProfile(user, {
      custom_attributes: {
        giftCode: giftCode.code,
        giftCodeId: giftCode._id,
        createdAt: giftCode.createdAt
      }
    });
  }
}
