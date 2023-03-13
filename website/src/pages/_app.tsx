import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { Inter, Oxanium, Montserrat, Merriweather } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

const oxanium = Oxanium({
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
            --font-merriweather: ${merriweather.style.fontFamily};
            --font-oxanium: ${oxanium.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
