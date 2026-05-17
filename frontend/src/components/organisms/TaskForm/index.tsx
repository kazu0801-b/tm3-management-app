"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Task, TaskStatus } from "@/types/task";
import { useState } from "react";

type Props = {
    onSubmit: (task: Task) => void;
};

export const TaskForm = ({ onSubmit}: Props) => {
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState<TaskStatus>("todo");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title.trim() || !assignee.trim()) {
            alert("タスク名と担当者を入力してください");
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title,
            assignee,
            status,
            startDate: "2026-05-01",
            dueDate: "2026-05-31",
        };

        onSubmit(newTask);

        setTitle("");
        setAssignee("");
        setStatus("todo");
    };

    return (
        <form className="grid max-w-md gap-4 rounded-lg border p-4" onSubmit={handleSubmit}>
            <Input 
                label="タスク名"
                value={title}
                placeholder="タスク名を入力"
                onChange={setTitle}
            />

            <Input
                label="担当者"
                value={assignee}
                placeholder="担当者を入力"
                onChange={setAssignee}
            />

            <Select
                label="ステータス"
                value={status}
                options={[
                    { label: "未対応", value: "todo"},
                    { label: "対応中", value: "doing"},
                    { label: "確認中", value: "done"},
                ]}
                onChange={(value) => setStatus(value as TaskStatus)}
            />

            <div className="flex gap-2">
                <Button>登録</Button>
                <Button variant="secondary">キャンセル</Button>      
            </div>
        </form>
    );
};