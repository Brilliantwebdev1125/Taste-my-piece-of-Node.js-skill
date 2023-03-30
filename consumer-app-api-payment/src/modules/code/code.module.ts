import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CodeController } from "./code.controller";
import { CodeService } from "./code.service";
import { GiftCodeModule } from "../giftcode/gift-code.module";
import { OfferCodeModule } from "../offercode/offercode.module";

@Module({
  imports: [
    ConfigModule,
    GiftCodeModule,
    OfferCodeModule
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: []
})
export class CodeModule {}