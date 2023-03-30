import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { OfferCodeModule } from "../offercode/offercode.module";
import { createServiceProviders } from "../../providers/service.provider";
import { MongooseModule } from "@nestjs/mongoose";
import { SubscriptionSchema } from "./schemas/subscription.schema";
import { GiftCodeTemplateModule } from "../giftcodetemplate/gift-code-template.module";
import { AdaptyService } from "../adapty/adapty.service";
const serviceProviders = createServiceProviders([
  { key: 'USER_SERVICE', queue: 'user' }
]);

@Module({
  imports: [
    ConfigModule,
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
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
    OfferCodeModule,
    GiftCodeTemplateModule
  ],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    SubscriptionController,
    AdaptyService,
    ...serviceProviders],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
