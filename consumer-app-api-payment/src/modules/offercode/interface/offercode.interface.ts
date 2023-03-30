export default interface OfferCode extends Document {

  code: string;
  androidSubscriptionId?: string;
  users?: object;
  expirationDate?: Date;
  isActive: boolean;
  description?: string;
}