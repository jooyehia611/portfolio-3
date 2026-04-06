import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yousef Yehia — Senior Backend Developer",
  description:
    "Portfolio of Yousef Yehia: backend developer specializing in PHP, Laravel, APIs, Magento 2, and WordPress. Experienced in scalable web applications, Agile delivery, and clean architecture.",
  // Favicons: use app/icon.png & app/apple-icon.png (circular PNGs; run scripts/generate-circular-icon.mjs after changing Me.jpeg)
  openGraph: {
    title: "Yousef Yehia — Senior Backend Developer",
    description:
      "Backend developer specializing in PHP, Laravel, APIs, Magento 2, and WordPress.",
    images: [{ url: "/image/Me.jpeg", width: 800, height: 800, alt: "Yousef Yehia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousef Yehia — Senior Backend Developer",
    images: ["/image/Me.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
