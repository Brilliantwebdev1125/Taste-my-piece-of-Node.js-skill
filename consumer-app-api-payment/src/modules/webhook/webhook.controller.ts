import { Controller, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { WebhookService } from "./webhook.service";
import { EventDataDto } from "./dto/event.dto";
import { ConfigService } from "@nestjs/config";

@Controller()
export class WebhookController {

  constructor(
    private readonly subscriptionService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: "webhook" })
  @UsePipes(new ValidationPipe())
  async processWebhook(event: EventDataDto) {
    if ((event.event_properties.environment == 'Production' && this.configService.get('NODE_ENV') == 'production') ||
      (event.event_properties.environment == 'Sandbox' && this.configService.get('NODE_ENV') == 'dev')) {
      switch(event.event_type) {
        case "subscription_initial_purchase":
          return this.subscriptionService.subscription_initial_purchase(event);
        case "subscription_cancelled":
          return this.subscriptionService.subscription_cancelled(event);
        case "subscription_renewed":
          return this.subscriptionService.subscription_renewed(event);
        case "trial_started":
          return this.subscriptionService.trial_started(event);
        case "trial_cancelled":
          return this.subscriptionService.trial_cancelled(event);
        case "subscription_refunded":
          return this.subscriptionService.subscription_refunded(event);
      }
    } else {
        await this.subscriptionService.redirectOnStage(event)
      }
    }
  }
