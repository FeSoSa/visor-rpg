import clsx from "clsx";
import { Head, Html, Main, NextScript } from "next/document";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head >

      </Head>
      <body
        className={clsx(
          "max-h-screen border-box bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
