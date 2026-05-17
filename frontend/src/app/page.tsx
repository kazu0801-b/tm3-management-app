"use client";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { Navigation } from "@/components/organisms/Navigation";
import { TaskCard } from "@/components/organisms/TaskCard";
import { TaskList } from "@/components/organisms/TaskList";
import { mockTasks } from "@/data/mockTasks";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">TM3管理ツール</h1>
      <Navigation />

      <section className="mt-8">
        <h2 className="text-xl font-bold">タスク一覧</h2>
        <div className="mt-4 flex gap-2">
          <Button>新規作成</Button>
          <Button variant="secondary">キャンセル</Button>
        </div>
        <div className="mt-4 max-w-sm">
          <Input 
          label="タスク名"
          value={title}
          placeholder="タスク名を入力"
          onChange={setTitle}
          />
        </div>
        <p className="mt-2">
          入力値: {title}
        </p>
        <div>
          <Select
            label="ステータス"
            value={status}
            options={[
              { label: "未対応", value:"todo"},
              { label: "対応中", value:"doing"},
              { label: "確認中", value:"review"},
              { label: "対応済み", value:"done"},
            ]}
            onChange={setStatus}
           />
        </div>

        <p className="mt-2">選択中: {status}</p>
        <div className="mt-4">
          <TaskList tasks={mockTasks} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">カンバン</h2>
        <div className="mt-4">
          <KanbanBoard tasks={mockTasks} />
        </div>
      </section>
    </main>
  );
}