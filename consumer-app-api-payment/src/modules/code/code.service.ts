import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { GiftCodeService } from "../giftcode/gift-code.service";
import OfferCode from "../offercode/interface/offercode.interface";
import { GiftCodeDto } from "../giftcode/dto/giftcode.dto";
import { OfferCodeService } from "../offercode/offercode.service";
import GiftCode from "../giftcode/interfaces/giftcode.interface";


@Injectable()
export class CodeService {

  constructor(
    protected offerCodeService: OfferCodeService,
    protected giftCodeService: GiftCodeService,
  ) {}

  async validateCode(userId: string, code: string): Promise<GiftCode|OfferCode> {

    let offerCode = await this.offerCodeService.validateAndroidOfferCode(userId, code);
    let giftCode = await this.giftCodeService.validateGiftCode(code);
    if (offerCode && giftCode) {
      throw new RpcException({
        message: 'There are two codes in DB. Please report this issue.',
        statusCode: HttpStatus.CONFLICT,
      });
    } if (offerCode) {
      return offerCode;
    } if (giftCode) {
      return giftCode;
    } else {
      throw new RpcException({
        message: 'Code doesn\'t exist.',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}