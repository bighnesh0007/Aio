import {
  ClerkProvider,
} from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { FloatingDockDemo } from "./FloatingDock";
import ChatBot from "@/components/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AGRIVISION",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
          <div className="min-h-screen flex flex-col  ">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-4">
                {children}
                <ChatBot />
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
