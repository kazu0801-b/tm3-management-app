import { Navigation } from "@/components/organisms/Navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TM3管理ツール",
  description: "タスク管理アプリ",
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <body>
        <header className="border-b p-6">
          <h1 className="text-2xl font-bold">TM3管理ツール</h1>
          <Navigation />
        </header>

        {children}
      </body>
    </html>
  );
};

export default RootLayout;