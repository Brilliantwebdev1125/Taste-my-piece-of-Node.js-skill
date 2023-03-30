import { HttpModule, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GiftCodeSchema } from "./schemas/giftcode.schema";
import { GiftCodeController } from "./gift-code.controller";
import { GiftCodeRepository } from "./gift-code.repository";
import { GiftCodeService } from "./gift-code.service";
import { GiftCodeTemplateModule } from "../giftcodetemplate/gift-code-template.module";
import { createServiceProviders } from "../../providers/service.provider";
import { OfferCodeModule } from "../offercode/offercode.module";
import { AdaptyModule } from "../adapty/adapty.module";
import { SubscriptionModule } from "../subscription/subscription.module";

const serviceProviders = createServiceProviders([
  { key: 'MAIL_SERVICE', queue: 'mail' },
  { key: 'USER_SERVICE', queue: 'user' }
]);

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('ADAPTY_URL'),
        headers: {
          'Authorization': 'Api-Key ' + configService.get('ADAPTY_SECRET_KEY')
        },
        timeout: 5000,
        maxRedirects: 5
      }),
      inject: [ConfigService]
    }),
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'GiftCode', schema: GiftCodeSchema },
    ]),
    GiftCodeTemplateModule,
    OfferCodeModule,
    SubscriptionModule,
    AdaptyModule],
  controllers: [GiftCodeController],
  providers: [
    GiftCodeRepository,
    GiftCodeService,
    ...serviceProviders],
  exports: [GiftCodeRepository, GiftCodeService]
})
export class GiftCodeModule {}
