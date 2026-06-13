# DB-06 API担当向け 画面別利用テーブル整理

## 目的

API担当者が画面ごとに必要なDBテーブル・データ項目を把握し、取得・登録・更新・削除APIの設計に使えるようにする。

## 前提

- users / roles は独自テーブルとして作成しない
- ユーザー管理・ロール管理は Directus 標準機能を使用する
- DB担当が整理する対象は主に以下のテーブル
  - projects
  - tasks
  - statuses
  - project_members

## 対象画面

- ログイン
- プロジェクト一覧
- タスク一覧
- タスク作成・編集
- カレンダー
- カンバン
- 簡易ガント

## 画面別利用テーブルまとめ

| 画面 | 主に使うテーブル | 主な用途 |
|---|---|---|
| ログイン | Directus標準ユーザー / Directus標準ロール | 認証 |
| プロジェクト一覧 | projects / project_members / Directus標準ユーザー | 参加プロジェクトの表示 |
| タスク一覧 | tasks / projects / statuses / project_members / Directus標準ユーザー | タスク一覧表示 |
| タスク作成・編集 | tasks / projects / statuses / project_members / Directus標準ユーザー | タスク登録・更新 |
| カレンダー | tasks / statuses / Directus標準ユーザー | 期限日ベースの表示 |
| カンバン | tasks / statuses / Directus標準ユーザー | ステータス別表示 |
| 簡易ガント | tasks / statuses / Directus標準ユーザー | 開始日〜期限日の期間表示 |

## 1. ログイン画面

### 使用するテーブル

- Directus標準ユーザー
- Directus標準ロール

### 必要なデータ項目

- メールアドレス
- パスワード
- ユーザーID
- ロール情報

### API担当向けメモ

ログイン処理は独自テーブルではなく、Directus標準の認証機能を利用する。

## 2. プロジェクト一覧画面

### 使用するテーブル

- projects
- project_members
- Directus標準ユーザー

### 必要なデータ項目

- プロジェクトID
- プロジェクト名
- 説明
- 作成者
- 更新日
- 参加メンバー

### API担当向けメモ

ログインユーザーが参加しているプロジェクト一覧を取得できるようにする。

## 3. タスク一覧画面

### 使用するテーブル

- tasks
- projects
- statuses
- project_members
- Directus標準ユーザー

### 必要なデータ項目

- タスクID
- タスク名
- 説明
- プロジェクトID
- ステータスID
- ステータス名
- 担当者ID
- 担当者名
- 開始日
- 期限日
- 作成者

### API担当向けメモ

プロジェクトに紐づくタスクを一覧取得できるようにする。  
画面表示では、status_id や assignee_id だけでなく、ステータス名・担当者名も必要になる。

## 4. タスク作成・編集画面

### 使用するテーブル

- tasks
- projects
- statuses
- project_members
- Directus標準ユーザー

### 必要なデータ項目

- タスク名
- 説明
- プロジェクトID
- ステータスID
- 担当者ID
- 開始日
- 期限日

### API担当向けメモ

タスク作成時は tasks に登録する。  
タスク編集時は tasks を更新する。  
担当者候補は project_members から取得する。  
ステータス候補は statuses から取得する。

## 5. カレンダー画面

### 使用するテーブル

- tasks
- statuses
- Directus標準ユーザー

### 必要なデータ項目

- タスクID
- タスク名
- 期限日
- ステータスID
- ステータス名
- 担当者名

### API担当向けメモ

期限日が設定されているタスクを取得し、カレンダー上の日付に表示する。  
必要に応じて、月単位で絞り込めるようにする。

## 6. カンバン画面

### 使用するテーブル

- tasks
- statuses
- Directus標準ユーザー

### 必要なデータ項目

- タスクID
- タスク名
- ステータスID
- ステータス名
- 担当者名
- 期限日

### API担当向けメモ

tasks を statuses ごとに分類して表示する。  
ステータス変更時は tasks.status_id を更新する。

## 7. 簡易ガント画面

### 使用するテーブル

- tasks
- statuses
- Directus標準ユーザー

### 必要なデータ項目

- タスクID
- タスク名
- 担当者名
- ステータス名
- 開始日
- 期限日

### API担当向けメモ

開始日と期限日があるタスクを取得し、横棒の期間表示に使う。  
ガント依存関係はMVPでは扱わない。