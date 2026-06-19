export type DirectusUser = {
    id: string;
    name: string;
    email: string;
};

export type DirectusRole = {
    id: string;
    name: "管理者"| "メンバー";
}