import { Author, PageableData } from '@/types/commonTypes';
import { Team } from '@/types/teamTypes';

export interface Announcement {
  id: 0;
  title: string;
  author: Author;
  content: string;
  createdDate: string;
  pinned: boolean;
  team: Team;
  editable: boolean;
  deletable: boolean;
  edited: boolean;
}

export interface Announcements extends PageableData {
  content: Announcement[] | [];
}
