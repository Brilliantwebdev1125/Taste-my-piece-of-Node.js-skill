import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OfferCodeSchema } from "./schemas/offercode.schema";
import { OfferCodeRepository } from "./offercode.repository";
import { OfferCodeController } from "./offercode.controller";
import { OfferCodeService } from "./offercode.service";


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'OfferCode', schema: OfferCodeSchema },
    ])
  ],
  controllers: [OfferCodeController],
  providers: [
    OfferCodeRepository,
    OfferCodeService],
  exports: [OfferCodeService, OfferCodeRepository]
})
export class OfferCodeModule {}
