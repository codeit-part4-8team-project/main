import { Author } from '@/types/commonTypes';
import { Member, Team } from '@/types/teamTypes';

export type IssueStatus = 'TODO' | 'INPROGRESS' | 'DONE';
export interface Issue {
  id: number;
  title: string;
  author: Author;
  content: string;
  assignedMembers: Member[] | [];
  dueDate: string;
  status: IssueStatus;
  team?: Team;
  editable: boolean;
  deletable: boolean;
}
export interface Issues {
  todoIssues: Issue[] | [];
  progressIssues: Issue[] | [];
  doneIssues: Issue[] | [];
  team?: Team;
}
