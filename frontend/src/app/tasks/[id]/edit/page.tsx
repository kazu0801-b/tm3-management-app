"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { Task, TaskStatus } from "@/types/task";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TaskEditPage = () => {
    const params = useParams();
    const router = useRouter();

    const taskId = params.id;

    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState<TaskStatus>("todo");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }

        setIsLoaded(true);
    }, []);

    const task = tasks.find((task) => task.id.toString() === taskId);

    useEffect(() => {
        if(!task) return;

        setTitle(task.title);
        setAssignee(task.assignee);
        setStatus(task.status);
        setStartDate(task.startDate);
        setDueDate(task.dueDate);
    }, [task]);

    if (!isLoaded) {
        return (
            <AppLayout>
                <p>読み込み中....</p>
            </AppLayout>
        );
    };

    if (!task) {
        return (
            <AppLayout>
                <p>タスクが見つかりません</p>
            </AppLayout>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedTasks = tasks.map((taskItem) => {
            if (taskItem.id === task.id) {
                return {
                    ...taskItem,
                    title,
                    assignee,
                    status,
                    startDate,
                    dueDate,
                };
            }

            return taskItem;
        });

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        router.push(`/tasks/${task.id}`);
    };

    return (
        <AppLayout>
            <Link
                href={`/tasks/${params.id}`}
                className="mb-4 inline-block text-blue-600 hover:underline"
            >
                ← 詳細へ戻る
            </Link>

            <h1 className="text-3xl font-bold">タスク編集</h1>

            <form onSubmit={handleSubmit} className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                <label className="block">
                    <span className="text-sm text-zinc-500">タスク名</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-full rounded-lg border px-4 py-2"
                    />
                </label>

                <label className="mt-4 block">
                    <span className="text-sm text-zinc-500">担当者</span>
                    <input
                        type="text"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="mt-1 w-full rounded-lg border px-4 py-2"
                    />
                </label>

                <label className="mt-4 block">
                    <span className="text-sm text-zinc-500">ステータス</span>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                        className="mt-1 w-full rounded-lg border px-4 py-2"
                    >
                        <option value="todo">未対応</option>
                        <option value="doing">対応中</option>
                        <option value="review">確認中</option>
                        <option value="done">対応済み</option>
                    </select>
                </label>

                <label className="mt-4 block">
                    <span className="text-sm text-zinc-500">開始日</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 w-full rounded-lg border px-4 py-2"
                    />
                </label>

                <label className="mt-4 block">
                    <span className="text-sm text-zinc-500">期日日</span>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 w-full rounded-lg border px-4 py-2"
                    />
                </label>
                
                <button
                    type="submit"
                    className="mt-6 rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                    保存
                </button>
            </form>
        </AppLayout>
    );
};

export default TaskEditPage;