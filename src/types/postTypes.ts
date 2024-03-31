import { Author, PageableData } from '@/types/commonTypes';
import { Team } from '@/types/teamTypes';

export interface Post {
  id: 0;
  title: string;
  author: Author;
  content: string;
  createdDate: string;
  likeCount: 0;
  team: Team;
  edited: boolean;
  liked: boolean;
}

export interface Posts extends PageableData {
  content: Post[] | [];
}
