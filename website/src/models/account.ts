export interface Account {
  id: string;
  name: string;
  starting_balance: number;
  total_revenues?: number;
  total_expenses?: number;
  total_transfers_sent?: number;
  total_transfers_received?: number;
  balance?: number;
  category: string;
  user_id?: string;
}
