import { Author, PageableData } from '@/types/commonTypes';

export interface Post {
  id: number;
  title: string;
  author: Author;
  content: string;
  createdDate: string;
  likeCount: number;
  edited: boolean;
  liked: boolean;
}

export interface Posts extends PageableData {
  content: Post[] | [];
}
