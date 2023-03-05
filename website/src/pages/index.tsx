import { useEffect, useState } from "react";
import Layout from "./components/layout";
import axios from "axios";
import { parseCookies } from "nookies";

type UserData = {
  name: string;
  nickname: string;
  email: string;
};

export default function Index() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const cookies = parseCookies();
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      axios
        .get("/api/userInfo", { headers: { Authorization: token } })
        .then((response) => setUserData(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Layout>
      <p>Hello, world!</p>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Nickname: {userData.nickname}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
