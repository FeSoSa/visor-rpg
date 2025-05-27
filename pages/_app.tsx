import { fontMono, fontSans } from "@/config/fonts";
import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/gameContext";
import { WebSocketProvider } from "@/context/WebSocketContext";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <AuthProvider>
          <GameProvider>
            <WebSocketProvider>
              <Component {...pageProps} />
            </WebSocketProvider>
          </GameProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
