export type Project = {
  id: number;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectMemberRole = "管理者" | "メンバー";

export type ProjectMember = {
  id: string;
  projectId: string;
  userId: string;
  memberRole: ProjectMemberRole;
};
