import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { OfferCodeService } from "./offercode.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateOfferCodeDto } from "./dto/offercode.dto";

@Controller()
export class OfferCodeController {

  constructor(
    private readonly offerCodeService: OfferCodeService,
  ) {}

  @MessagePattern({ cmd: 'create-offer-code' })
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true }))
  async createAndroidOfferCode(payload: CreateOfferCodeDto) {
    return await this.offerCodeService.create(
      payload.body
    );
  }
}