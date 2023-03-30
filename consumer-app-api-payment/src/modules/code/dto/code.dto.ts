import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CodeDto {

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class BaseParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class ValidateCodeDto {
  @ValidateNested()
  @Type(() => CodeDto)
  body: CodeDto;

  @ValidateNested()
  @Type(() => BaseParamsDto)
  params?: BaseParamsDto
}