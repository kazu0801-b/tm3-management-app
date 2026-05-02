## Git運用ルール

### ブランチ構成

- `main`：完成版・本番反映用
- `develop`：開発中の作業を集めるブランチ
- `feature/xxx`：各自の作業ブランチ

### 基本の作業手順

作業を始めるときは、必ず `develop` を最新にしてから作業ブランチを作成します。

```bash
git switch develop
git pull origin develop
git switch -c feature/作業名