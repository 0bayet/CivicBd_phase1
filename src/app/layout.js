import { Fraunces, Plus_Jakarta_Sans, Noto_Sans_Bengali } from "next/font/google";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bangla = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bangla",
  display: "swap",
});

const DESCRIPTION =
  "See It. Report It. Solve It. A community platform for reporting potholes, waste, drainage, streetlight and water supply problems in Bangladesh.";

export const metadata = {
  title: {
    default: "CivicBD | See It. Report It. Solve It.",
    template: "%s | CivicBD",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "CivicBD",
    description: DESCRIPTION,
    type: "website",
    locale: "en_BD",
    siteName: "CivicBD",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b6356",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${bangla.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <TopBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
