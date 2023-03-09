export interface Transfer {
  id?: string;
  description: string;
  amount: number;
  due_date: Date;
  done: boolean;
  origin_account_id: string;
  destination_account_id: string;
  user_id?: string;
}
