export const Sidebar = () => {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r bg-zinc-900 text-white">
            <div className="flex min-h-screen w-64 flex-col border-r bg-zinc-900 text-white">
                <h1 className="border-b border-zinc-800 p-6">
                    TM3管理ツール
                </h1>

                <p className="mt-2 text-sm text-zinc-400">
                    Project Management
                </p>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                <button className="rounded-lg bg-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-700">
                    タスク一覧
                </button>

                <button className="rounded-lg px-4 py-3 text-left transition hover:bg-zinc-800">
                    カレンダー
                </button>

                <button className="rounded-lg px-4 py-3 text-left transition hover:bg-zinc-800">
                    カンバン
                </button>
                
                <button className="rounded-lg px-4 py-3 text-left transition hover:bg-zinc-800">
                    ガントチャート
                </button>
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