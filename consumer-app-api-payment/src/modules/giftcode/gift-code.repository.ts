import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import GiftCode from "./interfaces/giftcode.interface";
import { GiftCodeDto } from "./dto/giftcode.dto";

@Injectable()
export class GiftCodeRepository {

  constructor(
    @InjectModel('GiftCode') private giftCodeModel: Model<GiftCode>,
  ) {}

  async save(giftCodeDto: GiftCodeDto): Promise<GiftCode> {
    const createdGiftCode = new this.giftCodeModel(giftCodeDto);
    return createdGiftCode.save();
  }

  async getById(id: string): Promise<GiftCode> {
    return this.giftCodeModel.findOne({_id: id});
  }

  async getByCode(code: string): Promise<GiftCode> {
    return this.giftCodeModel.findOne({code: code});
  }

  async getAll(): Promise<GiftCode[]> {
    return this.giftCodeModel.find();
  }

  async update(giftCodeDto: Partial<GiftCode>): Promise<GiftCode> {
    return this.giftCodeModel.findOneAndUpdate({ _id: giftCodeDto._id }, giftCodeDto, );
  }
}