export default interface WebhookEvent extends Document {

  profile_id: string;
  customer_user_id: string;
  event_type: string;
  event_datetime: Date;
  event_properties?: any;
  event_api_version: number;
}