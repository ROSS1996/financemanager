import { useState, useEffect } from "react";
import axios from "axios";

interface Transfer {
  id?: string;
  description: string;
  amount: string;
  due_date: string;
  done: string;
  origin_account_id: number;
  destination_account_id: number;
  user_id?: string;
}

function useTransfer(transferId: string | undefined) {
  const [transfer, setTransfer] = useState<Transfer>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/transfers/read", {
          params: { id: transferId },
        });
        const transferData = response.data.transfer;
        setTransfer(transferData);
      } catch (error) {
        console.error(error);
        setTransfer(undefined);
      }
    };

    if (transferId) {
      fetchData();
    } else {
      setTransfer(undefined);
    }
  }, [transferId]);

  return transfer;
}

export default useTransfer;
