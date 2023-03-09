export interface Expense {
  id: string;
  description: string;
  amount: number;
  due_date: Date;
  paid: boolean;
  category: string;
  account_id: string;
  user_id: string;
  paid_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
