"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
    const pathname = usePathname();

    const linkClass = (href: string) => {
        const isActive = pathname === href;

        return isActive
            ? "rounded bg-blue-600 px-3 text-white"
            : "rounded px-3 py-2 text-blue-600 underline";
    };
    return (
        <nav>
            <Link href="/" className="text-blue-600 underline" >
                タスク一覧
            </Link>
            <Link href="/kanban" className="text-blue-600 underline">
                カンバン
            </Link>
        </nav>
    );
};