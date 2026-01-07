export interface SubscriptionOrder {
  id: number;
  external_id: string;
  user_id: number;
  subscription_id: number;
  status: "pending" | "processing" | "completed" | "failed";
  payment_reference: string | null;
  created_at: Date;
  updated_at: Date;
}