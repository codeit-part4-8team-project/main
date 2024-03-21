export interface PostType {
  id: number;
  title: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
  };
  content: string;
  isAnnouncement: boolean;
  createdDate: string;
  edited: boolean;
}
