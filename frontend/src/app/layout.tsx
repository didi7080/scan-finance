import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scan Finance — Intelligence Financière",
  description: "Votre moteur premium d'éducation financière",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-navy-950 text-white min-h-screen`}>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-black pointer-events-none" />
        <div className="relative z-10">
          <Header />
          <main className="max-w-5xl mx-auto px-4 pb-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
