import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EventDataDto {
  @IsNotEmpty()
  @IsString()
  profile_id: string;

  @IsNotEmpty()
  @IsString()
  customer_user_id: string;

  @IsNotEmpty()
  @IsString()
  event_type: string;

  @IsNotEmpty()
  event_datetime: Date;

  @IsOptional()
  event_properties?: any;

  @IsNotEmpty()
  @IsNumber()
  event_api_version: number;
}