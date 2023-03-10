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
  account_id: number;
  received_at: string | null;
  created_at: string;
  updated_at: string;
}

function useRevenue(revenueId: string | undefined) {
  const [revenue, setRevenue] = useState<Revenue>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/revenues/read", {
          params: { id: revenueId },
        });
        const revenueData = response.data.revenue;
        setRevenue(revenueData);
      } catch (error) {
        console.error(error);
        setRevenue(undefined);
      }
    };

    if (revenueId) {
      fetchData();
    } else {
      setRevenue(undefined);
    }
  }, [revenueId]);

  return revenue;
}

export default useRevenue;
