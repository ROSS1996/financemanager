import { useState, useEffect } from "react";
import axios from "axios";
import { Revenue } from "@/models/revenue";

function useRevenue(revenueId: string | undefined) {
  const [revenue, setRevenue] = useState<Revenue>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/revenues/read/${revenueId}`);
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
