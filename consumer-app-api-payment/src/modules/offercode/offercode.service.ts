import { HttpStatus, Injectable } from "@nestjs/common";
import { OfferCodeRepository } from "./offercode.repository";
import { OfferCodeDto } from "./dto/offercode.dto";
import { RpcException } from "@nestjs/microservices";
import OfferCode from "./interface/offercode.interface";


@Injectable()
export class OfferCodeService {

  constructor(
    protected offerCodeRepository: OfferCodeRepository,
  ) {}

  async create(offerCode: OfferCodeDto): Promise<OfferCode> {
    const code = await this.offerCodeRepository.getByCode(offerCode.code);

    if(code) {
      throw new RpcException({
        message: 'Offer code already exist.',
        statusCode: HttpStatus.CONFLICT,
      });
    } else {
      return this.offerCodeRepository.save(offerCode);
    }
  }

  async update(offerCode: OfferCodeDto): Promise<OfferCode> {
    return this.offerCodeRepository.update(offerCode);
  }

  async validateAndroidOfferCode(userId: string, code: string): Promise<OfferCode> {
    let offerCode = await this.offerCodeRepository.getByCode(code);
    if (offerCode && offerCode.isActive) {
      offerCode = this.preventReusingOfferCode(offerCode, userId);
      return await this.offerCodeRepository.update(offerCode);
    } else {
      return null;
    }
  }

  async activateAndroidOfferCode(userId: string, subscription: string): Promise<OfferCode> {
    let offerCode = await this.offerCodeRepository.getByAndroidSubscription(subscription);
    if (offerCode) {
      offerCode.users[userId] = true;
      return this.offerCodeRepository.update(offerCode);
    }
  };

  async deactivateAndroidOfferCode(userId: string, subscription: string): Promise<OfferCode> {
    let offerCode = await this.offerCodeRepository.getByAndroidSubscription(subscription);
    if (offerCode) {
      offerCode.users[userId] = false;
      return this.offerCodeRepository.update(offerCode);
    }
  }

  protected preventReusingOfferCode(offerCode: OfferCode, user: string): OfferCode {
    if (offerCode.users[user]) {
      throw new RpcException({
        message: 'Code is already used.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    } else {
      offerCode.users[user] = false;
      return offerCode;
    }
  }
}