import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Krystal Medical Centre - Your Health, Our Priority",
  description: "Krystal Medical Centre in Magodo offers comprehensive healthcare services with online appointment booking, expert medical care, and patient-centered approach.",
  keywords: "medical centre, hospital, healthcare, appointment booking, Magodo, Lagos, Nigeria",
  authors: [{ name: "Krystal Medical Centre" }],
  openGraph: {
    title: "Krystal Medical Centre - Your Health, Our Priority",
    description: "Comprehensive healthcare services with online appointment booking",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        <AdminAuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AdminAuthProvider>
      </body>
    </html>
  );
}
