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

function useExpenses(userId: string | undefined) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expenses/all", {
          params: { id: userId },
        });
        setExpenses(response.data.expenses);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setExpenses([]);
    }
  }, [userId]);

  return expenses;
}

export default useExpenses;
