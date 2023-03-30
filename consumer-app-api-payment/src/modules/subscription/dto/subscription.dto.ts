import { SubscriptionStatusEnum } from "../../../enum";
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { OfferCodeDto } from "../../offercode/dto/offercode.dto";
import { GiftCodeDto } from "../../giftcode/dto/giftcode.dto";
import { Type } from "class-transformer";

export class BaseParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SubscriptionDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  expirationDate: Date;
}

export class SetUserSubscriptionPayloadDto {

  @ValidateNested()
  @Type(() => SubscriptionDto)
  body: SubscriptionDto

}

export class GetUserSubscriptionPayloadDto {

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params: BaseParamsDto
}
