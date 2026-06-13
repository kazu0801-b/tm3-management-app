import { AppLayout } from "@/components/templates/AppLayout";
import { Fragment } from "react/jsx-runtime";

const ganttTask = [
    {
        id: 1,
        title: "要件定義を確認する",
        start: 1,
        duration: 3,
    },
    {
        id: 2,
        title: "テーブル定義を作成する",
        start: 4,
        duration: 4,
    },
    {
        id: 3,
        title: "ER図を作成する",
        start: 8,
        duration: 2,
    },
];

const days = ["6/1", "6/2", "6/3", "6/4", "6/5", "6/6", "6/7", "6/8", "6/9", "6/10"];

const GanttPage = () => {
    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">ガントチャート</h1>
                <p className="mt-2 text-zinc-500">
                    タスクの開始日と期日日を横棒で確認できます。
                </p>
            </div>

            <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="grid grid-cols-[200px_repeat(10,1fr)] border-l border-t text-sm">
                    <div className="border-b border-r bg-zinc-50 p-3 font-bold">
                        タスク名
                    </div>

                    {days.map((day) => (
                        <div
                         kay={day}
                         className="border-b border-r bg-zinc-50 p-3 text-center font-bold"
                        >
                            {day}
                        </div>
                    ))}

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
                             className="border-b border-r p-2"
                            >
                                {isInRange && (
                                    <div className="h-6 rounded bg-blue-500" />
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