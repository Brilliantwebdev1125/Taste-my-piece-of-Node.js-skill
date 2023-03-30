import { SubscriptionStatusEnum } from "../../../enum";

export default interface Subscription extends Document {

  subscriptionStatus: SubscriptionStatusEnum,
  user: string,
  activeOfferCode: string,
  activeGiftCode: string,
  expirationDate: Date
}
