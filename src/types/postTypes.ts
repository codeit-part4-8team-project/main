import { Author, PageableData } from '@/types/commonTypes';
import { Team } from '@/types/teamTypes';

export interface Post {
  id: number;
  title: string;
  author: Author;
  content: string;
  createdDate: string;
  likeCount: number;
  team: Team;
  editable: boolean;
  deletable: boolean;
  edited: boolean;
  liked: boolean;
}

export interface Posts extends PageableData {
  content: Post[] | [];
}
