import { Inter, Roboto_Condensed, Open_Sans, Playfair } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import PixelatedCurve from "./components/pixelatedcurve";
import BurnBackground from "./components/BurnBackground";
import ContentWrapper from "./components/contentwrapper";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

const memoGold = localFont({
  src: "../public/Memo Gold.ttf",
  variable: "--font-memo-gold",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = await headers().then((h) => h.get("cookie"));

  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} ${roboto.variable} ${openSans.variable} ${playfair.variable} ${memoGold.variable} h-full`}
      >
        <ContextProvider cookies={cookies}>
          <div className="min-h-screen h-full bg-[#302c2e] flex">
            <ContentWrapper>
              <BurnBackground />
              <PixelatedCurve />
              <div className="relative flex flex-col flex-1 h-full md:overflow-visible overflow-auto">
                <div className="relative z-30">
                  <NavBar />
                </div>

                <div className="relative z-20 max-w-5xl mx-auto flex-1">
                  {children}
                </div>

                <div className="relative z-10 mt-auto">
                  <Footer />
                </div>
              </div>
            </ContentWrapper>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
