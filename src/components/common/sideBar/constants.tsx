import { ReactNode } from 'react';
import BoxIcon from '@/assets/BoxIcon';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface Board {
  boardName: string;
  icon: ReactNode;
}

export interface Boards {
  main: Board;
  schedules: Board;
  announcements: Board;
  posts: Board;
}

export const BOARDS: Boards = {
  main: {
    boardName: '대시보드',
    icon: <BoxIcon />,
  },
  schedules: {
    boardName: '나의 캘린더',
    icon: <CalendarIcon />,
  },
  announcements: {
    boardName: '칸반보드',
    icon: <ViewListIcon />,
  },
  posts: {
    boardName: '자유게시판',
    icon: <FolderIcon />,
  },
};
