import { Author, PageableData } from '@/types/commonTypes';

export interface Announcement {
  id: number;
  title: string;
  author: Author;
  content: string;
  createdDate: string;
  pinned: boolean;
  edited: boolean;
}

export interface Announcements extends PageableData {
  content: Announcement[] | [];
}
