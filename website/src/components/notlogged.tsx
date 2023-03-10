import Link from "next/link";

export const NotLogged: React.FC = () => {
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
