import { PageableData } from '@/types/commonTypes';

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
  startDate?: string;
  endDate?: string;
  figmaLink?: string;
  githubLink?: string;
  discordLink?: string;
  members?: Member[] | [];
}

export interface Teams extends PageableData {
  content: Team[] | [];
}
