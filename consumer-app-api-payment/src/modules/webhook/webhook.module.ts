import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";
import { createServiceProviders } from "../../providers/service.provider";
import { MongooseModule } from "@nestjs/mongoose";
import { OfferCodeSchema } from "../offercode/schemas/offercode.schema";
import { SubscriptionModule } from "../subscription/subscription.module";

const serviceProviders = createServiceProviders([
  { key: 'USER_SERVICE', queue: 'user' },
  { key: 'MAIL_SERVICE', queue: 'mail' }
]);

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'OfferCode', schema: OfferCodeSchema },
    ]),
    HttpModule,
    SubscriptionModule,
  ],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    WebhookController,
    ...serviceProviders]
})
export class WebhookModule {}
