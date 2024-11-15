import type { Metadata } from "next";
import { Inter, Roboto_Condensed, Open_Sans, Playfair, Pixelify_Sans, Nova_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import PixelatedCurve from './components/PixelatedCurve';
import BurnBackground from './components/BurnBackground';
import ContentWrapper from './components/ContentWrapper';

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

const pixelSerif = Nova_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const pixelFont = Pixelify_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
})

const memoGold = localFont({
  src: '../public/Memo Gold.ttf',
  variable: '--font-memo-gold',
  display: 'swap',
});

const handy00 = localFont({
  src: '../public/handy00.ttf',
  display: 'swap',
});

const SUPERSCR = localFont({
  src: '../public/SUPERSCR.ttf',
  display: 'swap',
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookies = await headers().then((h) => h.get("cookie"));
  
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.variable} ${openSans.variable} ${playfair.variable} ${memoGold.variable}`}>
        <ContextProvider cookies={cookies}>
          <div className="min-h-screen bg-[#302c2e] flex">
            <ContentWrapper>
              <BurnBackground />
              <PixelatedCurve />
              <div className="relative flex flex-col flex-1">
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