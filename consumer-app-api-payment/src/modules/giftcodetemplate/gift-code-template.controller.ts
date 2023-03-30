import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { GetCodeTemplatePayloadDto, GetCodeTemplatesPayloadDto } from "./dto/gift-code-template.dto";
import { GiftCodeTemplateService } from "./gift-code-template.service";

@Controller()
export class GiftCodeTemplateController {

  constructor(
    protected codeTemplateService: GiftCodeTemplateService,
  ) {}

  @MessagePattern({ cmd: 'get-gift-code-templates' })
  @UsePipes(new ValidationPipe())
  async getGiftCodeTemplates() {
    return await this.codeTemplateService.getActiveTemplates();
  }

  @MessagePattern({ cmd: 'get-gift-code-template' })
  @UsePipes(new ValidationPipe())
  async getGiftCodeTemplate(payload: GetCodeTemplatePayloadDto) {
    return await this.codeTemplateService.get(payload.params.id);
  }
}