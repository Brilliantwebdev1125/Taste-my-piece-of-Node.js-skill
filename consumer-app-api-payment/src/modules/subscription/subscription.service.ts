import { Inject, Injectable } from "@nestjs/common";
import { AccessLevel, SubscriptionStatusEnum } from "../../enum";
import { GiftCodeTemplateService } from "../giftcodetemplate/gift-code-template.service";
import { ClientProxy } from "@nestjs/microservices";
import { AdaptyService } from "../adapty/adapty.service";

@Injectable()
export class SubscriptionService {

  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly giftCodeTemplateService: GiftCodeTemplateService,
    private readonly adaptyService: AdaptyService
  ) {}


  async getByUser(user: string) {
    return this.adaptyService.getSubscription(user);
  }

  async updateSubscription(user: string, expirationDate: Date) {
    const profile = await this.adaptyService.getProfile(user);
    if (!profile) {
      await this.adaptyService.createProfile(user);
    }
    await this.setUserPremiumStatus(user);
    await this.adaptyService.setAccessLevel(user, AccessLevel.PREMIUM,
      expirationDate);
    await this.adaptyService.getProfile(user);
  }


  async setUserPremiumStatus(user: string) {
    return await this.userService.send(
      { cmd: 'set-subscription-status' },
      { params: { id: user },
        body: { status: SubscriptionStatusEnum.PREMIUM} },
    ).toPromise();
  }
}
