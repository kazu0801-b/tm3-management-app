import { AppLayout } from "@/components/templates/AppLayout";
import { Fragment } from "react/jsx-runtime";

const ganttTask = [
    {
        id: 1,
        title: "要件定義を確認する",
        start: 1,
        duration: 3,
        status: "todo",
    },
    {
        id: 2,
        title: "テーブル定義を作成する",
        start: 4,
        duration: 4,
        status: "doing",
    },
    {
        id: 3,
        title: "ER図を作成する",
        start: 8,
        duration: 2,
        status: "review",
    },
    {
        id: 4,
        title: "gitにpushする",
        start: 4,
        duration: 1,
        status: "done",
    }
];

const days = ["6/1", "6/2", "6/3", "6/4", "6/5", "6/6", "6/7", "6/8", "6/9", "6/10"];

const today = 5;

const getBarColorClass = (status: string) => {
    if(status === "todo") return "bg-zinc-400";
    if(status === "doing") return "bg-blue-500";
    if(status === "review") return "bg-yellow-400"
    if(status === "done") return "bg-green-500";

    return "bg-zinc-400";
};

const GanttPage = () => {
    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">ガントチャート</h1>
                <p className="mt-2 text-zinc-500">
                    タスクの開始日と期日日を横棒で確認できます。
                </p>
                <div className="mt-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-z">
                        <div className="h-4 w-4 rounded bg-zinc-400" />
                        <span>未対応</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-blue-400" />
                        <span>対応中</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-yellow-400" />
                        <span>確認中</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-green-500" />
                        <span>対応済み</span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="grid grid-cols-[200px_repeat(10,1fr)] border-l border-t text-sm">
                    <div className="border-b border-r bg-zinc-50 p-3 font-bold">
                        タスク名
                    </div>

                    {days.map((day, index) => {
                        const currentDay = index + 1;

                        return (
                            <div
                             key={day}
                             className={`border-b border-r p-3 text-center font-bold ${
                                currentDay === today
                                 ? "bg-red-100 text-red-600"
                                 : "bg-zinc-50"
                             }`}
                             >
                                {day}
                            </div>
                        )
                    })}

                    {ganttTask.map((task) => (
                        <Fragment key={task.id}>
                         <div
                          key={`${task.id}-title`}
                          className="border-b border-r p-3"
                        >
                            {task.title}
                        </div>

                        {days.map((day, index) => {
                            const currentDay = index + 1;
                            const isInRange =
                             currentDay >= task.start &&
                             currentDay < task.start + task.duration;

                        return (
                            <div
                             key={`${task.id}-${day}`}
                             className={`border-b border-r p-2 ${
                                currentDay === today ? "bg-red-50" : ""
                             }`}
                            >
                                {isInRange && (
                                    <div className={`h-6 rounded ${getBarColorClass(task.status)}`} />
                                )}
                            </div>
                        )
                        })}
                        </Fragment>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default GanttPage;