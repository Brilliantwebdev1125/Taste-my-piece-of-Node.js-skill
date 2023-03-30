import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriptionModule } from "./modules/subscription/subscription.module";
import { OfferCodeModule } from "./modules/offercode/offercode.module";
import { MongooseModule } from "@nestjs/mongoose";
import { GiftCodeTemplateModule } from "./modules/giftcodetemplate/gift-code-template.module";
import { GiftCodeModule } from "./modules/giftcode/gift-code.module";
import { CodeModule } from "./modules/code/code.module";
import { AdaptyModule } from "./modules/adapty/adapty.module";
import { WebhookModule } from "./modules/webhook/webhook.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    OfferCodeModule,
    SubscriptionModule,
    WebhookModule,
    CodeModule,
    GiftCodeTemplateModule,
    GiftCodeModule,
    AdaptyModule
  ],
})
export class AppModule {}
