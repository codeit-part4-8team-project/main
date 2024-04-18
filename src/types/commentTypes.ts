import { Author, PageableData } from '@/types/commonTypes';

export interface Mention {
  id: number;
  name: string;
  imageUrl: string;
  role: string;
  grade: string;
  username: string;
  createdDate: string;
}

export interface Comment {
  id: 0;
  content: string;
  author: Author;
  mention: Mention;
  reply: string[];
  createdDate: string;
  editable: boolean;
  deletable: boolean;
}

export interface Comments extends PageableData {
  content: Comment[];
}
