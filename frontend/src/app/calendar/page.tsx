"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { useState } from "react";

const days = [
  "30",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "1",
  "2",
  "3",
  "4",
];

const CalendarPage = () => {
  const [viewMode, setViewMode] = useState("month");

  const viewButtonClass = (mode: string) => {
    const isActive = viewMode === mode;

    return isActive
      ? "rounded border bg-blue-600 px-3 py-1 text-sm text-white"
      : "rounded border px-3 py-1 text-sm hover:bg-zinc-50";
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">カレンダー</h1>
          <p className="mt-2 text-zinc-500">
            タスクの期限をカレンダーで確認できます。
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
          +タスクを追加
        </button>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">2026年 6月</h2>
            <p className="text-sm text-zinc-500">
              現在の表示:
              {viewMode === "month" && "月表示"}
              {viewMode === "week" && "週表示"}
              {viewMode === "day" && "日表示"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className={viewButtonClass("month")}
              onClick={() => setViewMode("month")}
            >
              月
            </button>
            <button
              className={viewButtonClass("week")}
              onClick={() => setViewMode("week")}
            >
              週
            </button>
            <button
              className={viewButtonClass("day")}
              onClick={() => setViewMode("day")}
            >
              日
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-600">
          {viewMode === "month" &&
            "月表示では、1ヶ月分のタスク期限を確認できます。"}
          {viewMode === "week" && "週表示は今後実装予定です。"}
          {viewMode === "day" && "日表示は今後実装予定です。"}
        </div>

        {viewMode === "month" && (
          <div className="grid grid-cols-7 border-l border-t">
            {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
              <div
                key={day}
                className="border-b border-r bg-zinc-50 p-3 text-center text-sm font-bold"
              >
                {day}
              </div>
            ))}

            {days.map((day, index) => {
              const date = `2026-06-${day.padStart(2, "0")}`;

              const tasksForDay = mockTasks.filter(
                (task) => task.dueDate === date,
              );

              return (
                <div
                  key={`${day}-${index}`}
                  className="min-h-28 border-b border-r p-2 text-sm"
                >
                  <p className="font-bold">{day}</p>

                  <div className="mt-1 space-y-1">
                    {tasksForDay.map((task) => (
                      <div
                        key={task.id}
                        className="rounded bg-blue-100 p-1 text-xs text-blue-700"
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
