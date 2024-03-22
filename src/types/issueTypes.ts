export interface Issue {
  id: number;
  title: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
  };
  content: string;
  assignedMembers: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
  }[];
  dueDate: string;
  status: string;
  teamName: string;
  teamColor: string;
}
