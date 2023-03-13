import { useState, useEffect } from "react";
import axios from "axios";
import { Revenue } from "@/models/revenue";

function useRevenues(userId: string | undefined) {
  const [revenues, setRevenues] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/revenues/all/${userId}`);
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
