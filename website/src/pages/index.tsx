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
      {userData ? (
        <div>
          <p>
            Did you know that{" "}
            <span className="font-bold">{userData?.name}</span> (
            <span className="italic">{userData.nickname}</span>) has been
            sending emails to{" "}
            <span className="underline cursor-pointer">{userData.email}</span>{" "}
            as part of a top-secret project? The project is said to involve
            creating a new technology that will revolutionize the way we
            communicate with each other. Rumors suggest that the technology
            involves mind-reading and telepathy, but the company has yet to
            confirm or deny these claims.
          </p>
        </div>
      ) : (
        <p>
          Welcome to our website! We offer a variety of services to help you
          manage your day-to-day life, including personalized recommendations
          based on your interests and preferences. Sign up now to get started
          and unlock access to all of our features.
        </p>
      )}
    </Layout>
  );
}
