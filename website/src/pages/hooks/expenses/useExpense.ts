import { useState, useEffect } from "react";
import axios from "axios";

interface Expense {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  paid: boolean;
  category: string;
  user_id: number;
  account_id: number;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

function useExpense(expenseId: string | undefined) {
  const [expense, setExpense] = useState<Expense>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expenses/read", {
          params: { id: expenseId },
        });
        const expenseData = response.data.expense;
        setExpense(expenseData);
      } catch (error) {
        console.error(error);
        setExpense(undefined);
      }
    };

    if (expenseId) {
      fetchData();
    } else {
      setExpense(undefined);
    }
  }, [expenseId]);

  return expense;
}

export default useExpense;
