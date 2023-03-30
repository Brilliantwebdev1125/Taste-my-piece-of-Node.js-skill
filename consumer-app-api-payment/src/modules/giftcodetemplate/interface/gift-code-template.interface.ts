export default interface GiftCodeTemplate extends Document {

  productId: string;

  months: number;

  accessLevel: string;

  isActive: boolean;

  description?: string;
  name?: string;

  price: number;
}