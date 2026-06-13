# MVP用 テーブル定義書

## 目的

MVPで使用するテーブルのカラム、型、必須、主キー、外部キー、初期値、説明を整理する。

API担当者が、各テーブルで必要なデータ項目を理解できる状態にする。

---

## 前提

MVPでは、Directusを使用する方針とする。

そのため、users と roles は独自テーブルとして作成せず、Directus標準のユーザー管理・権限管理を使用する。

ただし、API担当者やフロント担当者が理解しやすいように、本資料では users / roles も参照対象として整理する。

---

# 1. users

## 役割

アプリを利用するユーザー情報を管理する。

MVPでは Directus標準ユーザーを使用するため、独自の users テーブルは作成しない。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | UUID | ○ | ○ | - | 自動生成 | ユーザーID |
| first_name | VARCHAR | - | - | - | - | 名 |
| last_name | VARCHAR | - | - | - | - | 姓 |
| email | VARCHAR | ○ | - | - | - | ログイン用メールアドレス |
| password | 管理側に依存 | ○ | - | - | - | パスワード。Directus側で管理 |
| role | UUID | ○ | - | directus_roles.id | - | Directus上の権限 |
| status | VARCHAR | ○ | - | - | active | ユーザー状態 |
| created_at | DATETIME | ○ | - | - | 自動 | 作成日時 |
| updated_at | DATETIME | - | - | - | 自動 | 更新日時 |

---

# 2. roles

## 役割

ユーザーの権限を管理する。

MVPでは Directus標準の権限機能を使用するため、独自の roles テーブルは作成しない。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | UUID | ○ | ○ | - | 自動生成 | 権限ID |
| name | VARCHAR | ○ | - | - | - | 権限名 |
| description | TEXT | - | - | - | - | 権限の説明 |

## MVPで使用する権限

| 権限名 | 説明 |
|---|---|
| 管理者 | プロジェクト作成、タスク管理、メンバー管理ができる |
| メンバー | プロジェクト参加、タスク作成・編集、ステータス変更ができる |

---

# 3. projects

## 役割

管理対象となるプロジェクト情報を管理する。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | UUID | ○ | ○ | - | 自動生成 | プロジェクトID |
| name | VARCHAR(255) | ○ | - | - | - | プロジェクト名 |
| description | TEXT | - | - | - | - | プロジェクト説明 |
| created_by | UUID | ○ | - | users.id | ログインユーザー | 作成者 |
| created_at | DATETIME | ○ | - | - | 現在日時 | 作成日時 |
| updated_at | DATETIME | - | - | - | 現在日時 | 更新日時 |

---

# 4. project_members

## 役割

プロジェクトに参加しているユーザーと、そのプロジェクト内での役割を管理する。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | UUID | ○ | ○ | - | 自動生成 | プロジェクトメンバーID |
| project_id | UUID | ○ | - | projects.id | - | 紐づくプロジェクト |
| user_id | UUID | ○ | - | users.id | - | 参加ユーザー |
| role_id | UUID | ○ | - | roles.id | メンバー | プロジェクト内での役割 |
| created_at | DATETIME | ○ | - | - | 現在日時 | 作成日時 |

---

# 5. tasks

## 役割

プロジェクトに紐づくタスク情報を管理する。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | UUID | ○ | ○ | - | 自動生成 | タスクID |
| project_id | UUID | ○ | - | projects.id | - | 紐づくプロジェクト |
| title | VARCHAR(255) | ○ | - | - | - | タスク名 |
| description | TEXT | - | - | - | - | タスクの詳細説明 |
| status_id | INT | ○ | - | statuses.id | 1 | ステータスID。初期値は未対応 |
| assignee_id | UUID | - | - | users.id | - | 担当者 |
| start_date | DATE | - | - | - | - | 開始日 |
| due_date | DATE | - | - | - | - | 期限日 |
| created_by | UUID | ○ | - | users.id | ログインユーザー | 作成者 |
| created_at | DATETIME | ○ | - | - | 現在日時 | 作成日時 |
| updated_at | DATETIME | - | - | - | 現在日時 | 更新日時 |

---

# 6. statuses

## 役割

タスクの進捗状態を管理する。

| カラム名 | 型 | 必須 | 主キー | 外部キー | 初期値 | 説明 |
|---|---|---|---|---|---|---|
| id | INT | ○ | ○ | - | - | ステータスID |
| name | VARCHAR(50) | ○ | - | - | - | ステータス名 |
| sort_order | INT | ○ | - | - | - | カンバン表示順 |

## 初期データ

| id | name | sort_order |
|---:|---|---:|
| 1 | 未対応 | 1 |
| 2 | 対応中 | 2 |
| 3 | 確認中 | 3 |
| 4 | 対応済み | 4 |

---

# 外部キー一覧

| テーブル | カラム | 参照先 | 説明 |
|---|---|---|---|
| projects | created_by | users.id | プロジェクト作成者 |
| project_members | project_id | projects.id | 参加対象のプロジェクト |
| project_members | user_id | users.id | 参加ユーザー |
| project_members | role_id | roles.id | プロジェクト内の役割 |
| tasks | project_id | projects.id | タスクが属するプロジェクト |
| tasks | status_id | statuses.id | タスクのステータス |
| tasks | assignee_id | users.id | タスク担当者 |
| tasks | created_by | users.id | タスク作成者 |

---

# MVPでの注意点

- users は Directus標準ユーザーを使用する
- roles は Directus標準の権限機能を使用する
- roles テーブルを独自作成するかどうかは、MVPでは原則不要とする
- 担当者は project_members に登録されているユーザーを対象とする
- タスク作成時の status_id 初期値は 1（未対応）とする
- カンバン画面では statuses.sort_order の順番で列を表示する

---

# 今回やらないDB設計

MVPでは以下のテーブル・設計は対象外とする。

| 対象外 | 理由 |
|---|---|
| comments | コメント機能はMVP対象外のため |
| notifications | 通知機能は実装コストが高いため |
| attachments | ファイル添付はストレージ設計が必要なため |
| activity_logs | 操作履歴はMVP後の拡張でよいため |
| task_dependencies | ガントの依存関係はMVPでは扱わないため |
| teams | 複数チーム管理は権限設計が複雑になるため |
| labels / tags | タスク分類はステータスと担当者で最低限対応するため |
| milestones | 期限管理は開始日・期限日で最低限対応するため |

---

# 完了条件

- 全テーブルのカラムが整理されている
- 主キー、外部キーが明記されている
- 必須項目が明記されている
- 初期値が明記されている
- API担当者が見て必要なデータ項目を理解できる