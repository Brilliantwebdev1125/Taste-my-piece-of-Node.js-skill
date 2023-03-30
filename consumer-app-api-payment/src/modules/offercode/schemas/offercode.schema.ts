import { Schema } from "mongoose";

export const OfferCodeSchema = new Schema({

  code: {
    type: String,
    required: true,
    unique: true
  },

  androidSubscriptionId: {
    type: String
  },

  users: {
    type: Object,
    default: {}
  },

  expirationDate: {
    type: Date,
    required: true
  },

  isActive: {
    type: Boolean,
    required: true,
    default: true
  },

  description: {
    type: String
  }
})