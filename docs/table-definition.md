# テーブル定義書

## 1. 概要

TM3管理ツールで使用するデータベースのテーブル定義をまとめる。

このアプリでは、ユーザー、プロジェクト、タスク、ステータス、プロジェクト参加者、権限を管理する。

---

## 2. テーブル一覧

| テーブル名 | 用途 |
|---|---|
| users | ユーザー情報を管理する |
| projects | プロジェクト情報を管理する |
| tasks | タスク情報を管理する |
| statuses | タスクのステータスを管理する |
| project_members | プロジェクトに参加しているユーザーを管理する |
| roles | ユーザーやメンバーの権限を管理する |

---

## 3. users テーブル

ユーザー情報を管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT / UUID | ○ | ○ |  |  | ユーザーID |
| name | VARCHAR(100) | ○ |  |  |  | ユーザー名 |
| email | VARCHAR(255) | ○ |  |  |  | メールアドレス |
| password | OSS管理 | ○ |  |  |  | パスワード。Directus側の認証機能で管理 |
| role_id | INT | ○ |  | roles.id |  | 権限ID |
| created_at | DATETIME | ○ |  |  | 現在日時 | 作成日時 |
| updated_at | DATETIME | ○ |  |  | 現在日時 | 更新日時 |

---

## 4. roles テーブル

権限を管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT | ○ | ○ |  |  | 権限ID |
| name | VARCHAR(50) | ○ |  |  |  | 権限名 |

### 初期データ

| id | name |
|---|---|
| 1 | 管理者 |
| 2 | メンバー |
| 3 | 閲覧者 |

---

## 5. projects テーブル

プロジェクト情報を管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT / UUID | ○ | ○ |  |  | プロジェクトID |
| name | VARCHAR(100) | ○ |  |  |  | プロジェクト名 |
| description | TEXT |  |  |  |  | プロジェクト説明 |
| created_by | INT / UUID | ○ |  | users.id |  | 作成者 |
| created_at | DATETIME | ○ |  |  | 現在日時 | 作成日時 |
| updated_at | DATETIME | ○ |  |  | 現在日時 | 更新日時 |

---

## 6. project_members テーブル

どのユーザーがどのプロジェクトに参加しているかを管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT / UUID | ○ | ○ |  |  | プロジェクトメンバーID |
| project_id | INT / UUID | ○ |  | projects.id |  | プロジェクトID |
| user_id | INT / UUID | ○ |  | users.id |  | ユーザーID |
| role_id | INT | ○ |  | roles.id |  | 権限ID |

---

## 7. statuses テーブル

タスクのステータスを管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT | ○ | ○ |  |  | ステータスID |
| name | VARCHAR(50) | ○ |  |  |  | ステータス名 |
| sort_order | INT | ○ |  |  |  | 表示順 |

### 初期データ

| id | name | sort_order |
|---|---|---|
| 1 | 未対応 | 1 |
| 2 | 対応中 | 2 |
| 3 | 確認中 | 3 |
| 4 | 対応済み | 4 |

---

## 8. tasks テーブル

プロジェクトに紐づくタスクを管理するテーブル。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT / UUID | ○ | ○ |  |  | タスクID |
| project_id | INT / UUID | ○ |  | projects.id |  | 紐づくプロジェクトID |
| title | VARCHAR(100) | ○ |  |  |  | タスク名 |
| description | TEXT |  |  |  |  | タスク詳細 |
| status_id | INT | ○ |  | statuses.id | 1 | ステータスID |
| assignee_id | INT / UUID |  |  | users.id |  | 担当者ID |
| start_date | DATE |  |  |  |  | 開始日 |
| due_date | DATE |  |  |  |  | 期限日 |
| created_by | INT / UUID | ○ |  | users.id |  | 作成者 |
| created_at | DATETIME | ○ |  |  | 現在日時 | 作成日時 |
| updated_at | DATETIME | ○ |  |  | 現在日時 | 更新日時 |

---

## 9. 補足

- MVPでは、1タスクにつき担当者は1名とする。
- ステータスは「未対応」「対応中」「確認中」「対応済み」の4種類とする。
- タスク削除はMVPでは物理削除を想定する。
- roles はDirectus側の権限機能で代替する可能性がある。
- password はアプリ側で直接管理せず、Directusの認証機能に任せる。