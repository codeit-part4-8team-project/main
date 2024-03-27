import { Team } from '@/types/teamTypes';

export interface Issue {
  id: number;
  title: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
    username: string;
  };
  content: string;
  assignedMembers: [
    {
      name: string;
      imageUrl: string;
      role: string;
      grade: string;
      username: string;
    },
  ];
  dueDate: '2024-03-25';
  status: 'TODO';
  team?: Team;
}
export interface Issues {
  todoIssues: Issue[] | [];
  progressIssues: Issue[] | [];
  doneIssues: Issue[] | [];
  team?: Team;
}
