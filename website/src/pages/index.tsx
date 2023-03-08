import { useEffect, useState } from "react";
import Layout from "./components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";

interface ProfileProps {
  session?: Session | null;
}

const NotLogged: React.FC = () => {
  return (
    <div>
      <header className="py-6 bg-white">
        <div className="container px-4">
          <h1 className="text-3xl font-bold">Welcome to My Finance Website</h1>
        </div>
      </header>
      <main className="container px-4 py-10">
        <section className="p-10 mb-8 border rounded border-slate-400">
          <h2 className="mb-4 text-2xl font-bold">Track Your Expenses</h2>
          <p className="mb-4">
            With our powerful expense tracking tools, you can easily keep track
            of where your money is going. Simply enter your expenses into our
            system and well take care of the rest.
          </p>
          <Link
            href="/login"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Start Tracking Expenses Now
          </Link>
        </section>
        <section className="p-10 mb-8 border rounded border-slate-400">
          <h2 className="mb-4 text-2xl font-bold">Create a Budget</h2>
          <p className="mb-4">
            Dont let your finances spiral out of control. With our budget
            creation tools, you can set goals for your spending and make sure
            you stay on track.
          </p>

          <Link
            href="/login"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Create a Budget Today
          </Link>
        </section>
        <section className="p-10 mb-8 border rounded border-slate-400">
          <h2 className="mb-4 text-2xl font-bold">
            Get Personalized Recommendations
          </h2>
          <p className="mb-4">
            Want to make the most of your money? Our financial experts are here
            to help. With our personalized recommendation system, you can get
            tailored advice on how to improve your financial situation.
          </p>

          <Link
            href="/login"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Get Personalized Recommendations Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  return (
    <Layout pageTitle="Home" pageDescription="Home">
      {sessionState ? (
        <div>
          <p className="p-2 text-justify">
            Did you know that{" "}
            <span className="font-bold">{sessionState.user?.name}</span> (
            <span className="italic">{sessionState.user?.username}</span>) has
            been sending emails to{" "}
            <span className="underline cursor-pointer">
              {sessionState.user?.email}
            </span>{" "}
            as part of a top-secret project? The project is said to involve
            creating a new technology that will revolutionize the way we
            communicate with each other. Rumors suggest that the technology
            involves mind-reading and telepathy, but the company has yet to
            confirm or deny these claims. As the project continued, more details
            began to emerge about the top-secret technology being developed by{" "}
            <span className="font-bold">{sessionState.user?.name}</span>. Some
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
            deeper and more meaningful connections, collaborating on on projects
            in real-time, and pushing the boundaries of what was possible in
            fields like science, engineering, and the arts. And it all started
            with the top-secret project that{" "}
            <span className="font-bold">{sessionState.user?.name}</span> had
            been working on. As the world celebrated this groundbreaking new
            technology, it was clear that the future of communication and
            collaboration had arrived, and that it was only going to get better
            from here.
          </p>
        </div>
      ) : (
        <NotLogged />
      )}
    </Layout>
  );
}
