"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Sidebar = () => {
    const pathname = usePathname();

    const linkClass = (href: string) => {
        const isActive = pathname === href;

        return isActive ? "rounded-lg bg-blue-800 px-4 py-3 text-white transition" : "rounded-lg px-4 py-3 text-left transition hover:bg-zinc-800";
    };
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r bg-zinc-900 text-white">
            <div className="border-b border-zinc-800 p-6">
                <h1 className="text-2xl font-bold">TM3管理ツール</h1>
                <p className="mt-2 text-sm text-zinc-400">Project Management</p>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                <Link href="/" className={linkClass("/")}>
                    タスク一覧
                </Link>

                <Link href="/kanban" className={linkClass("/kanban")}>
                    カンバン
                </Link>

                <Link href="/calendar" className={linkClass("/calendar")}>
                    カレンダー
                </Link>
                <Link href="/gantt" className={linkClass("/gantt")}>
                    ガントチャート
                </Link>
            </nav>

            <div className="border-t border-zinc-800 p-4">
                <p className="text-sm text-zinc-400">
                    ログイン中
                </p>

                <p className="mt-1 font-bold">
                    Takuto
                </p>
            </div>
        </aside>
    );
};