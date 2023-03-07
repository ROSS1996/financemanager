export interface Transfer {
  id?: string;
  description: string;
  amount: string;
  due_date: string;
  done: string;
  origin_account_id: string;
  destination_account_id: string;
  user_id?: string;
}
