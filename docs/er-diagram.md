# ER図

## 1. 概要

TM3管理ツールで使用する主要テーブルの関係を整理する。

このER図では、以下のテーブル同士の関係を表す。

- users
- roles
- projects
- project_members
- statuses
- tasks

---

## 2. Mermaid ER図

```mermaid
erDiagram
    roles ||--o{ users : "has"
    roles ||--o{ project_members : "has"

    users ||--o{ projects : "creates"
    users ||--o{ tasks : "creates"
    users ||--o{ tasks : "assigned"
    users ||--o{ project_members : "joins"

    projects ||--o{ tasks : "has"
    projects ||--o{ project_members : "has"

    statuses ||--o{ tasks : "has"

    roles {
        int id PK
        varchar name
    }

    users {
        int id PK
        varchar name
        varchar email
        int role_id FK
        datetime created_at
        datetime updated_at
    }

    projects {
        int id PK
        varchar name
        text description
        int created_by FK
        datetime created_at
        datetime updated_at
    }

    project_members {
        int id PK
        int project_id FK
        int user_id FK
        int role_id FK
    }

    statuses {
        int id PK
        varchar name
        int sort_order
    }

    tasks {
        int id PK
        int project_id FK
        varchar title
        text description
        int status_id FK
        int assignee_id FK
        date start_date
        date due_date
        int created_by FK
        datetime created_at
        datetime updated_at
    }
```

---

## 3. リレーション説明

| 親テーブル | 子テーブル | 関係 | 説明 |
|---|---|---|---|
| roles | users | 1対多 | 1つの権限に複数ユーザーが紐づく |
| roles | project_members | 1対多 | プロジェクト内の権限を管理する |
| users | projects | 1対多 | 1人のユーザーが複数プロジェクトを作成できる |
| users | tasks | 1対多 | 1人のユーザーが複数タスクを作成できる |
| users | tasks | 1対多 | 1人のユーザーが複数タスクを担当できる |
| users | project_members | 1対多 | 1人のユーザーが複数プロジェクトに参加できる |
| projects | tasks | 1対多 | 1つのプロジェクトに複数タスクが紐づく |
| projects | project_members | 1対多 | 1つのプロジェクトに複数メンバーが参加できる |
| statuses | tasks | 1対多 | 1つのステータスに複数タスクが紐づく |

---

## 4. 補足

- MVPでは、1タスクにつき担当者は1名とする。
- `tasks.assignee_id` は担当者を表す。
- `tasks.created_by` はタスク作成者を表す。
- `projects.created_by` はプロジェクト作成者を表す。
- `project_members` は、ユーザーとプロジェクトの中間テーブルとして扱う。
- `roles` はDirectus側の権限機能で代替する可能性がある。