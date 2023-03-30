import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";

import { GiftCodeService } from "./gift-code.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  BulkGiftCodeGenerateDto,
  CreateGiftCodeDto,
  RedeemGiftCodeDto
} from "./dto/giftcode.dto";

@Controller()
export class GiftCodeController {

  constructor(
    private readonly giftCodeService: GiftCodeService,
  ) {
  }

  @MessagePattern({ cmd: 'redeem-gift-code' })
  @UsePipes(new ValidationPipe())
  async redeemGiftCode(payload: RedeemGiftCodeDto) {
    return await this.giftCodeService.redeemCode(
      payload.body.code, payload.params.id
    );
  }

  @MessagePattern({ cmd: 'create-gift-code' })
  @UsePipes(new ValidationPipe())
  async createGiftCode(payload: CreateGiftCodeDto) {
    return await this.giftCodeService.createGiftCode(
      payload.body.buyerEmail,
      payload.body.receiverEmail,
      payload.body.template
    );
  }

  @MessagePattern({ cmd: 'bulk-gift-code-generate' })
  @UsePipes(new ValidationPipe())
  async bulkGiftCodeGenerate(payload: BulkGiftCodeGenerateDto) {
    return await this.giftCodeService.bulkCreate(
      payload.body.receivers,
      payload.body.buyerEmail,
      payload.body.templateId
    );
  }
}
