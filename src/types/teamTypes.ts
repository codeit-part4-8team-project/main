export interface Member {
  name: string;
  imageUrl: string;
  role: string;
  grade: string;
  username: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  color: string;
  members: Member[];
}
