import { useState, useEffect } from "react";
import axios from "axios";

interface Account {
  id: number;
  name: string;
  starting_balance: string;
  category: string;
  user_id?: string;
}

function useAccounts(userId: string | undefined) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/accounts/all", {
          params: { id: userId },
        });
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

export default useAccounts;
