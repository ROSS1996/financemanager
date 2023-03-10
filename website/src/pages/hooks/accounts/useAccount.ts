import { useState, useEffect } from "react";
import axios from "axios";

interface Account {
  id: number;
  name: string;
  starting_balance: string;
  category: string;
  user_id?: string;
}

function useAccount(accountId: string | undefined) {
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/accounts/read", {
          params: { id: accountId },
        });
        const accountData = response.data.account;
        setAccount(accountData);
      } catch (error) {
        console.error(error);
        setAccount(undefined);
      }
    };

    if (accountId) {
      fetchData();
    } else {
      setAccount(undefined);
    }
  }, [accountId]);

  return account;
}

export default useAccount;