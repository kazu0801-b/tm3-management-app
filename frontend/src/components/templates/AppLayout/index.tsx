import { Sidebar } from "@/components/organisms/Sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};
