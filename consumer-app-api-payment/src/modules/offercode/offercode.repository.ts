import { Injectable } from "@nestjs/common";
import OfferCode from "./interface/offercode.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OfferCodeDto } from "./dto/offercode.dto";

@Injectable()
export class OfferCodeRepository {

  constructor(
    @InjectModel('OfferCode') private offerCodeModel: Model<OfferCode>,
  ) {}

  async save(offerCode: OfferCodeDto): Promise<OfferCode> {
    const createdOfferCode = new this.offerCodeModel(offerCode);
    return createdOfferCode.save();
  }

  async getByCode(code: string): Promise<OfferCode> {
    return this.offerCodeModel.findOne({code: code});
  }

  async getByAndroidSubscription(androidSubscriptionId: string): Promise<OfferCode> {
    return this.offerCodeModel.findOne({androidSubscriptionId: androidSubscriptionId});
  }

  async getAll(): Promise<OfferCode[]> {
    return this.offerCodeModel.find();
  }

  async update(offerCode: OfferCodeDto): Promise<OfferCode> {
    return this.offerCodeModel.findOneAndUpdate({ code: offerCode.code }, offerCode, {
      new: true,
    });
  }
}