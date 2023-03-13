import { useState, useEffect } from "react";
import axios from "axios";

interface Account {
  id: string;
  userId: string;
  name: string;
  starting_balance: number;
  category: string;
  total_revenues: number;
  total_expenses: number;
  total_transfers_received: number;
  total_transfers_sent: number;
  balance: number;
}

function useBalance(userId: string | number) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/accounts/balance/${userId}`);
        setAccounts(response.data.accounts);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setAccounts([]);
    }
  }, [userId]);

  return accounts;
}

export default useBalance;
