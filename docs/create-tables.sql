-- DB-08 MySQL用CREATE TABLE文たたき台
-- 対象：TM3管理ツール MVP
--
-- 方針：
-- users / roles は自作テーブルとして作成せず、
-- Directus標準のユーザー管理・ロール管理機能を利用する。
--
-- そのため、このSQLでは users / roles のCREATE TABLE文は作成しない。
--
-- Directus標準ユーザーを参照する想定の項目：
-- - projects.created_by
-- - project_members.user_id
-- - tasks.assignee_id
-- - tasks.created_by
--
-- 注意：
-- Directus標準テーブルの実テーブル名・ID型は、バックエンド担当またはAPI担当と確認する。
-- ここでは、DirectusユーザーIDを CHAR(36) と仮定したたたき台とする。

-- =========================================
-- 作成順
-- 1. statuses
-- 2. projects
-- 3. project_members
-- 4. tasks
-- =========================================

-- =========================================
-- 1. statuses
-- ステータス定義
-- =========================================
CREATE TABLE statuses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  sort_order INT NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- 2. projects
-- プロジェクト情報
-- =========================================
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NULL,

  -- Directus標準ユーザーのIDを想定
  created_by CHAR(36) NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- 3. project_members
-- プロジェクト参加者
-- =========================================
CREATE TABLE project_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,

  -- Directus標準ユーザーのIDを想定
  user_id CHAR(36) NOT NULL,

  -- プロジェクト内での役割
  -- Directusのrolesテーブルは自作しないため、MVPでは文字列で管理する想定
  role_name VARCHAR(50) NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_project_members_project_id
    FOREIGN KEY (project_id)
    REFERENCES projects(id),

  CONSTRAINT uq_project_members_project_user
    UNIQUE (project_id, user_id)
);

-- =========================================
-- 4. tasks
-- タスク情報
-- =========================================
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status_id INT NOT NULL,

  -- Directus標準ユーザーのIDを想定
  assignee_id CHAR(36) NULL,
  created_by CHAR(36) NOT NULL,

  start_date DATE NULL,
  due_date DATE NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_tasks_project_id
    FOREIGN KEY (project_id)
    REFERENCES projects(id),

  CONSTRAINT fk_tasks_status_id
    FOREIGN KEY (status_id)
    REFERENCES statuses(id),

  CONSTRAINT chk_tasks_date_order
    CHECK (
      start_date IS NULL
      OR due_date IS NULL
      OR start_date <= due_date
    )
);