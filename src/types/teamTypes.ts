import { PageableData } from '@/types/commonTypes';

export type Grade = 'OWNER' | 'MANAGER' | 'TEAM_MEMBER';
export type Role = 'BACKEND' | 'FRONTEND' | 'DESIGNER' | 'PRODUCT_MANEGER';

export interface Member {
  id: number;
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
  startDate?: string;
  endDate?: string;
  figmaLink?: string;
  githubLink?: string;
  discordLink?: string;
  members?: Member[] | [];
}

export type RequiredTeam = Required<Team>;

export interface Teams extends PageableData {
  content: Team[] | [];
}

export interface Members extends PageableData {
  content: Member[] | [];
}
