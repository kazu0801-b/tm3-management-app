"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Task, TaskStatus } from "@/types/task";
import { useState } from "react";

type Props = {
  onSubmit: (task: Task) => void;
};

export const TaskForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !assignee.trim() || !startDate.trim()) {
      alert("タスク名、担当者、開始日、期限日を入力してください");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      assignee,
      status,
      startDate,
      dueDate,
    };

    onSubmit(newTask);

    setTitle("");
    setAssignee("");
    setStatus("todo");
    setStartDate("");
    setDueDate("");
  };

  return (
    <form
      className="grid max-w-2xl gap-4 rounded-xl border bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
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
          { label: "未対応", value: "todo" },
          { label: "対応中", value: "doing" },
          { label: "確認中", value: "review" },
          { label: "対応済み", value: "done" },
        ]}
        onChange={(value) => setStatus(value as TaskStatus)}
      />

      <label className="block">
        <span className="text-sm font-bold text-zinc-700">開始日</span>
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-700">期限日</span>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
        />
      </label>

      <div className="mt-2 flex justify-end gap-3">
        <Button>登録</Button>
        <Button variant="secondary">キャンセル</Button>
      </div>
    </form>
  );
};
