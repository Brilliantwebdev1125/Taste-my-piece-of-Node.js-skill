import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GiftCodeTemplateDto } from "./dto/gift-code-template.dto";
import GiftCodeTemplate from "./interface/gift-code-template.interface";


@Injectable()
export class GiftCodeTemplateRepository {

  constructor(
    @InjectModel('GiftCodeTemplate') private codeTemplateModel: Model<GiftCodeTemplate>,
  ) {}

  async save(codeTemplate: GiftCodeTemplateDto): Promise<GiftCodeTemplate> {
    const createdCodeTemplate = new this.codeTemplateModel(codeTemplate);
    return createdCodeTemplate.save();
  }

  async getActiveCodeTemplates(): Promise<GiftCodeTemplate[]> {
    return this.codeTemplateModel.find({isActive: true});
  }

  async get(id: string): Promise<GiftCodeTemplate> {
    return this.codeTemplateModel.findOne({_id: id});
  }
}