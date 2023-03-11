export interface Revenue {
  id?: string;
  description: string;
  amount: number;
  due_date: Date;
  received: boolean;
  category: string;
  account_id: string;
  user_id?: string;
  received_at: Date;
  created_at?: Date;
  updated_at?: Date;
}
