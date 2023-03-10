import { useState, useEffect } from "react";
import axios from "axios";

interface Revenue {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  received: boolean;
  category: string;
  user_id: number;
  received_at: string | null;
  account_id: number;
  created_at: string;
  updated_at: string;
}

function useRevenues(userId: string | undefined) {
  const [revenues, setRevenues] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/revenues/all", {
          params: { id: userId },
        });
        setRevenues(response.data.revenues);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setRevenues([]);
    }
  }, [userId]);

  return revenues;
}

export default useRevenues;
