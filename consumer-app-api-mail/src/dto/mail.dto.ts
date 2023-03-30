import { IsNotEmpty, IsString, ValidateNested, IsOptional, IsEmail } from 'class-validator';
import {Type} from 'class-transformer';

export class ResetPasswordMailDataDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  link?: string;
}

export class ResetPasswordMailPayloadDto {
  @ValidateNested()
  @Type(() => ResetPasswordMailDataDto)
  body: ResetPasswordMailDataDto;
}

export class CreateMailsBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateMailsPayloadDto {
  @ValidateNested()
  @Type(() => CreateMailsBodyDto)
  body: CreateMailsBodyDto;
}
