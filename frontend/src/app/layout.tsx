import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TM3管理ツール",
  description: "タスク管理アプリ",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
