import { Schema } from "mongoose";
import { GiftCodeSourceEnum } from "../../../enum";

export const GiftCodeSchema = new Schema({

  code: {
    type: String,
    required: true
  },

  receiver: {
    type: String
  },

  receiverEmail: {
    type: String
  },

  template: {
    type: Schema.Types.ObjectId,
    ref: 'GiftCodeTemplate'
  },

  isActive: {
    type: Boolean,
    required: true,
    default: false
  },

  isUsed: {
    type: Boolean,
    required: true,
    default: false
  },

  transaction: {
    type: String
  },

  buyerEmail: {
    type: String
  }
})
