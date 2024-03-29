export type Grade = 'OWNER' | 'MANAGER' | 'TEAM_MEMBER';
export type Role = 'BACKEND' | 'FRONTEND' | 'DESIGNER';

export interface Member {
  name: string;
  imageUrl: string;
  role: Role | null;
  grade: Grade;
  username: string;
  createdDate: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  color: string;
  members?: Member[] | [];
}
