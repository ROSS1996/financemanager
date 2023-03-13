import { useState, useEffect } from "react";
import axios from "axios";
import { Account } from "@/models/account";

function useAccounts(userId: string | number | undefined) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/accounts/all/${userId}`);
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
