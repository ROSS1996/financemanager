import { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "@/models/expense";

function useExpenses(userId: string | undefined) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expenses/all/${userId}`);

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
