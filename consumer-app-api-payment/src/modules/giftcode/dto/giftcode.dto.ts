import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import GiftCodeTemplate from "../../giftcodetemplate/interface/gift-code-template.interface";

export class GiftCodeDto {

  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsString()
  @IsNotEmpty()
  buyer?: string;

  @IsString()
  @IsOptional()
  receiver?: string;

  @IsString()
  @IsNotEmpty()
  template?: string;

  @IsNumber()
  @IsOptional()
  createDate?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isUsed?: boolean;

  @IsString()
  @IsOptional()
  transaction?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  buyerEmail: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  receiverEmail?: string;

}

export class BaseParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class ActivateGiftCodeBody {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class ActivateGiftCodeDto {
  @ValidateNested()
  @Type(() => ActivateGiftCodeBody)
  body: ActivateGiftCodeBody;

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}


export class RedeemGiftCodeBody {
  @IsString()
  @IsNotEmpty()
  code: string;

}

export class RedeemGiftCodeDto {
  @ValidateNested()
  @Type(() => RedeemGiftCodeBody)
  body: RedeemGiftCodeBody;

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}

export class CreateGiftCodeBody {
  @IsString()
  @IsNotEmpty()
  template: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  buyerEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  receiverEmail: string;

}

export class CreateGiftCodeDto {

  @ValidateNested()
  @Type(() => CreateGiftCodeBody)
  body: CreateGiftCodeBody;

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}

export class BulkGiftCodeGenerateBody {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsEmail(undefined, { each: true })
  receivers: string[];

  @IsEmail()
  buyerEmail: string;

  @IsString()
  @IsNotEmpty()
  templateId: string;
}

export class BulkGiftCodeGenerateDto {
  @ValidateNested()
  @Type(() => BulkGiftCodeGenerateBody)
  body: BulkGiftCodeGenerateBody;
}
