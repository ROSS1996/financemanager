import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export default function Index() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.token || "");
    setUserId(cookies.userId || "");
  }, []);

  return (
    <div>
      <h1>Token: {token}</h1>
      <h1>User ID: {userId}</h1>
    </div>
  );
}
