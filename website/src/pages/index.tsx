import { useEffect, useState } from "react";
import Layout from "./components/layout";
import axios from "axios";
import { parseCookies } from "nookies";

type UserData = {
  firstname: string;
  username: string;
  email: string;
};

export default function Index() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const cookies = parseCookies();
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      axios
        .get("/api/user/info", { headers: { Authorization: token } })
        .then((response) => setUserData(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Layout>
      {userData ? (
        <div>
          <p className="p-2 text-justify">
            Did you know that{" "}
            <span className="font-bold">{userData?.firstname}</span> (
            <span className="italic">{userData.username}</span>) has been
            sending emails to{" "}
            <span className="underline cursor-pointer">{userData.email}</span>{" "}
            as part of a top-secret project? The project is said to involve
            creating a new technology that will revolutionize the way we
            communicate with each other. Rumors suggest that the technology
            involves mind-reading and telepathy, but the company has yet to
            confirm or deny these claims. As the project continued, more details
            began to emerge about the top-secret technology being developed by{" "}
            <span className="font-bold">{userData?.firstname}</span>. Some
            sources claimed that the project involved advanced AI algorithms
            that could interpret and respond to human emotions, allowing people
            to communicate with each other on a deeper level than ever before.
            Others speculated that the technology was more focused on enhancing
            human productivity, allowing people to work together more
            efficiently and effectively than ever before. This would be
            accomplished through a complex system of neural interfaces and
            brain-computer interfaces that would allow people to communicate and
            collaborate in real-time, without the need for traditional tools
            like email or chat software. Despite the rumors and speculation, the
            company remained tight-lipped about the nature of the project.
            However, as the technology continued to evolve, it became clear that
            it was something truly groundbreaking. People around the world
            waited with bated breath for the official announcement, eager to see
            what the future held for communication and collaboration in the
            digital age. Finally, after months of anticipation, the company
            announced that the project was ready for public release. The
            technology was called NeuroLink, and it was everything that the
            rumors had promised and more. With NeuroLink, people could
            communicate with each other using nothing more than their thoughts,
            making it the most advanced communication technology ever created.
            As people around the world began to adopt NeuroLink, it quickly
            became clear that it was changing the way people interacted with
            each other in profound and unexpected ways. People were forming
            deeper and more meaningful connections, collaborating on projects in
            real-time, and pushing the boundaries of what was possible in fields
            like science, engineering, and the arts. And it all started with the
            top-secret project that{" "}
            <span className="font-bold">{userData?.firstname}</span> had been
            working on. As the world celebrated this groundbreaking new
            technology, it was clear that the future of communication and
            collaboration had arrived, and that it was only going to get better
            from here.
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
