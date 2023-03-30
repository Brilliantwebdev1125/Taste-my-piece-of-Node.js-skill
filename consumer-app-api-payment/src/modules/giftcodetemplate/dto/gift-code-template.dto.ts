import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class BaseParamsDto {

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GiftCodeTemplateDto {

  @IsString()
  @IsNotEmpty()
  iosProductId: string;

  @IsString()
  @IsNotEmpty()
  androidProductId: string;

  @IsString()
  @IsNotEmpty()
  websiteProductId: string;

  @IsString()
  @IsNotEmpty()
  paywall: string;

  @IsString()
  @IsNotEmpty()
  accessLevel: string;

  @IsString()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  price: string;
}

export class GetCodeTemplatesPayloadDto {

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}

export class GetCodeTemplatePayloadDto {

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params: BaseParamsDto
}