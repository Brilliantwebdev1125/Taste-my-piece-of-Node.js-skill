export default interface GiftCode extends Document  {

  _id: string;
  code: string;

  receiver?: string;

  template: string;
  productId?: string;

  isActive?: boolean;
  isUsed?: boolean;

  createdAt?: Date;
  transaction?: string;

  buyerEmail?: string;
  receiverEmail?: string;
}
