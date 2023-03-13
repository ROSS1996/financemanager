import Link from "next/link";
import Image from "next/image";

import financePic from "../../public/images/finances.jpg";
import budgetPic from "../../public/images/budget.jpg";
import educationPic from "../../public/images/education.jpg";
import futurePic from "../../public/images/future.jpg";

export const NotLogged: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-200">
      <header className="flex flex-col items-center justify-center w-full py-8">
        <div className="container flex flex-col items-center px-4">
          <h1 className="text-4xl font-bold">Welcome to My Finance App</h1>
          <p className="mt-2 text-gray-600">
            Take control of your finances and manage your money with ease.
          </p>
        </div>
      </header>
      <main className="flex flex-col w-full gap-5 px-4 divide-y">
        <section className="flex flex-col items-center justify-between gap-2 px-6 py-5 rounded md:flex-row md:gap-10">
          <div>
            <Image
              src={financePic}
              alt="managing finances"
              className="rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center md:text-start">
              Managing Your Finances Made Simple
            </h2>
            <p className="text-lg text-center md:text-left">
              Our app simplifies financial management, so you can focus on your
              life. With intuitive features like balance tracking, expense
              monitoring, and budgeting tools, you can easily stay on top of
              your finances
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-between gap-2 px-6 py-5 rounded md:flex-row-reverse md:gap-10">
          <div>
            <Image
              src={futurePic}
              alt="managing budget"
              className="rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center md:text-left">
              Financial Planning for Your Future
            </h2>
            <p className="text-lg text-center md:text-left">
              Our app helps you plan for your financial future with features
              like savings goals, investment tracking, and retirement planning
              tools. With our help, you can be confident in your long-term
              financial security.
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center justify-between gap-2 px-6 py-5 rounded md:flex-row md:gap-10">
          <div>
            <Image
              src={educationPic}
              alt="managing budget"
              className="rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center md:text-left">
              Financial Education and Resources
            </h2>
            <p className="text-lg text-center md:text-left">
              We believe in empowering our users with financial education and
              resources. Our app provides access to articles, tutorials, and
              financial experts to help you make informed decisions about your
              money.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-between gap-2 px-6 py-5 rounded md:flex-row-reverse md:gap-10">
          <div>
            <Image
              src={budgetPic}
              alt="managing budget"
              className="rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center md:text-left">
              Flexible and Customizable
            </h2>
            <p className="text-lg text-center md:text-left">
              We understand that everyone&apos;s financial needs are different.
              That is why our app is designed to be flexible and customizable.
              You can create your own financial goals, set budgets, and tailor
              the app to your unique needs.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
