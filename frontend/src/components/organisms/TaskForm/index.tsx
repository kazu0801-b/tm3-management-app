"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { TaskStatus } from "@/types/task";
import { useState } from "react";

export const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState<TaskStatus>("todo");

    return (
        <form className="grid max-w-md gap-4 rounded-lg border p-4">
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