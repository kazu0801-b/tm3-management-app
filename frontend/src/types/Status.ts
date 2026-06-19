export type StatusName = "未対応" | "対応中" | "確認中" | "対応済み";

export type Status = {
  id: number;
  name: StatusName;
  sortOrder: number;
};
