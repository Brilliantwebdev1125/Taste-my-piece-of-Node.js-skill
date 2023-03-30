import GiftCodeTemplate from "./interface/gift-code-template.interface";
import { Injectable } from "@nestjs/common";
import { GiftCodeTemplateRepository } from "./gift-code-template.repository";

@Injectable()
export class GiftCodeTemplateService {

  constructor(
    protected codeTemplateRepository: GiftCodeTemplateRepository,
  ) {}

  async getActiveTemplates(): Promise<GiftCodeTemplate[]> {
    return this.codeTemplateRepository.getActiveCodeTemplates();
  }

  async get(id: string): Promise<GiftCodeTemplate> {
    return this.codeTemplateRepository.get(id);
  }
}