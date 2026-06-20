"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { Task } from "@/types/task";
import { Fragment, useEffect, useState } from "react";

const timelineLength = 10;

const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDateLabel = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const getBaseDate = (tasks: Task[]) => {
  const startDates = tasks
    .map((task) => parseDate(task.startDate))
    .filter((date) => !Number.isNaN(date.getTime()));

  if (startDates.length === 0) {
    return parseDate("2026-06-01");
  }

  return new Date(Math.min(...startDates.map((date) => date.getTime())));
};

const createTimelineDays = (baseDate: Date) => {
  return Array.from({ length: timelineLength }, (_, index) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + index);

    return {
      key: formatDateKey(date),
      label: formatDateLabel(date),
      date,
    };
  });
};

const getBarColorClass = (status: string) => {
  if (status === "todo") return "bg-zinc-400";
  if (status === "doing") return "bg-blue-500";
  if (status === "review") return "bg-yellow-400";
  if (status === "done") return "bg-green-500";

  return "bg-zinc-400";
};

const isTaskInDay = (task: Task, currentDate: Date) => {
  const startDate = parseDate(task.startDate);
  const dueDate = parseDate(task.dueDate);

  return currentDate >= startDate && currentDate <= dueDate;
};

const GanttPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const baseDate = getBaseDate(tasks);
  const days = createTimelineDays(baseDate);
  const todayKey = formatDateKey(new Date());

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">ガントチャート</h1>
        <p className="mt-2 text-zinc-500">
          タスクの開始日と期日を横棒で確認できます。
        </p>

        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-zinc-400" />
            <span>未対応</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-500" />
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
        <div
          className="grid border-l border-t text-sm"
          style={{
            gridTemplateColumns: `200px repeat(${timelineLength}, minmax(80px, 1fr))`,
          }}
        >
          <div className="border-b border-r bg-zinc-50 p-3 font-bold">
            タスク名
          </div>

          {days.map((day) => (
            <div
              key={day.key}
              className={`border-b border-r p-3 text-center font-bold ${
                day.key === todayKey ? "bg-red-100 text-red-600" : "bg-zinc-50"
              }`}
            >
              {day.label}
            </div>
          ))}

          {tasks.map((task) => (
            <Fragment key={task.id}>
              <div className="border-b border-r p-3">{task.title}</div>

              {days.map((day) => {
                const isInRange = isTaskInDay(task, day.date);

                return (
                  <div
                    key={`${task.id}-${day.key}`}
                    className={`border-b border-r p-2 ${
                      day.key === todayKey ? "bg-red-50" : ""
                    }`}
                  >
                    {isInRange && (
                      <div
                        className={`h-6 rounded ${getBarColorClass(
                          task.status,
                        )}`}
                      />
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default GanttPage;