import { HttpService, Inject, Injectable } from "@nestjs/common";
import { EventDataDto } from "./dto/event.dto";
import { ClientProxy } from "@nestjs/microservices";
import { SubscriptionStatusEnum } from "../../enum";
import { SubscriptionService } from "../subscription/subscription.service";
import { STAGE_API_URL } from "../../constants";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WebhookService {

  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('MAIL_SERVICE') private readonly mailService: ClientProxy,
    protected httpService: HttpService,
    protected subscriptionService: SubscriptionService,
    protected configService:  ConfigService
  ) {}

  async subscription_initial_purchase(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.PREMIUM} },
    ).toPromise();
  }

  async subscription_cancelled(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.FREE} },
    ).toPromise();
  }

  async subscription_renewed(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.PREMIUM} },
    ).toPromise()
  }

  async trial_started(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.TRIAL} },
    ).toPromise()
  }

  async trial_cancelled(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.FREE} },
    ).toPromise();
    await this.userService.send(
      { cmd: 'disconnect-device' },
      { params: { id: event.customer_user_id },
        body: { id: event.customer_user_id} },
    ).toPromise();
    const user = await this.userService.send(
      { cmd: 'get' },
      { params: { id: event.customer_user_id } }
    ).toPromise();
    const trialCancelledMailData = {
      email: user.email,
      subject: 'Don’t let stress get in the way of your success',
      firstName: user.firstName
    }
    await this.mailService
      .send({ cmd: 'send-trial-cancelled-mail' }, { body: trialCancelledMailData })
      .toPromise();
  }

  async subscription_refunded(event: EventDataDto) {
    await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: event.customer_user_id },
        body: { status: SubscriptionStatusEnum.FREE } },
    ).toPromise();
  }

  async redirectOnStage(event: EventDataDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.configService.get('API_KEY_STAGE'),
    };
    return this.httpService.post(STAGE_API_URL + 'payment/webhook', event, { headers: headers })
      .toPromise();
  }
}
