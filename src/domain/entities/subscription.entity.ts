export interface Subscription {
  id: number;
  external_id: string;
  name: string;
  price: number;
  duration_days: number;
  created_at: Date;
}