export interface UserSubscription {
  id: number;
  user_id: number;
  subscription_id: number;
  start_date: Date;
  end_date: Date;
  status: "active" | "expired" | "cancelled";
  created_at: Date;
}