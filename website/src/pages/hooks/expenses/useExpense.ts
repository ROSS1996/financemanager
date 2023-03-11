import { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "@/models/expense";

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
