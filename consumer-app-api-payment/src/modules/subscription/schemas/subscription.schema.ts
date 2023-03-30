import { Schema } from "mongoose";
import { SubscriptionStatusEnum } from "../../../enum";

export const SubscriptionSchema = new Schema({

  subscriptionStatus: {
    type: SubscriptionStatusEnum
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  activeOfferCode: {
    type: Schema.Types.ObjectId,
    ref: 'OfferCode'
  },
  activeGiftCode: {
    type: Schema.Types.ObjectId,
    ref: 'GiftCode'
  },
  expirationDate: {
    type: Date
  }
})