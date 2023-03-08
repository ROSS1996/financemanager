import { useState, useEffect } from "react";
import axios from "axios";

interface Transfer {
  id?: string;
  description: string;
  amount: string;
  due_date: string;
  done: string;
  origin_account_id: string;
  destination_account_id: string;
  user_id?: string;
}

function useTransfers(userId: string | undefined) {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/transfers/all", {
          params: { id: userId },
        });
        setTransfers(response.data.transfers);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setTransfers([]);
    }
  }, [userId]);

  return transfers;
}

export default useTransfers;
