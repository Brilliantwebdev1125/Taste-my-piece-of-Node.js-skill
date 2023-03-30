import { Schema } from "mongoose";

export const GiftCodeTemplateSchema = new Schema({

  accessLevel: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    required: true,
    default: true
  },

  description: {
    type: String
  },

  name: {
    type: String,
    required: true
  },

  productId: {
    type: String
  },

  months: {
    type: Number
  },

  price: {
    type: Number,
    required: true,
    default: 0
  }
})
