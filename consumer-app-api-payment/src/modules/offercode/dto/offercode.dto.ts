import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OfferCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  androidSubscriptionId?: string;

  @IsNotEmpty()
  expirationDate?: Date;


  @IsOptional()
  @IsString()
  description?: string;
}

export class BaseParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateOfferCodeDto {
  @ValidateNested()
  @Type(() => OfferCodeDto)
  body: OfferCodeDto;

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}