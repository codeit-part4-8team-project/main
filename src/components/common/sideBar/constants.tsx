import { ReactNode } from 'react';
import BoxIcon from '@/assets/BoxIcon';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface Board {
  boardName: string;
  icon: ReactNode;
  link: string;
}

export interface Boards {
  dashboard: Board;
  calendar: Board;
  kanbanboard: Board;
  board: Board;
}

export const BOARDS: Boards = {
  dashboard: {
    boardName: '대시보드',
    icon: <BoxIcon />,
    link: '/main',
  },
  calendar: {
    boardName: '나의 캘린더',
    icon: <CalendarIcon />,
    link: '/schedules/1',
  },
  kanbanboard: {
    boardName: '칸반보드',
    icon: <ViewListIcon />,
    link: '/myIssues/1',
  },
  board: {
    boardName: '자유게시판',
    icon: <FolderIcon />,
    link: '/teams/1/posts',
  },
};
