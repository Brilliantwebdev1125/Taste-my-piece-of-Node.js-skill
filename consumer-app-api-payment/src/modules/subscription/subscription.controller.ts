import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { MessagePattern } from "@nestjs/microservices";
import { GetUserSubscriptionPayloadDto, SetUserSubscriptionPayloadDto } from "./dto/subscription.dto";

@Controller()
export class SubscriptionController {

  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @MessagePattern({ cmd: 'get-subscription' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getUserSubscription(payload: GetUserSubscriptionPayloadDto) {
    return await this.subscriptionService.getByUser(
      payload.params.id
    );
  }

  @MessagePattern({ cmd: 'set-subscription' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async setUserSubscription(payload: SetUserSubscriptionPayloadDto) {
      return await this.subscriptionService.updateSubscription(payload.body.user, payload.body.expirationDate)
  }
}
