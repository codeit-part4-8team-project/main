import BoxOffIcon from '../../../../public/assets/box-off.svg';
import BoxOnIcon from '../../../../public/assets/box-on.svg';
import CalendarOffIcon from '../../../../public/assets/calendar-off.svg';
import CalendarOnIcon from '../../../../public/assets/calendar-on.svg';
import FolderOffIcon from '../../../../public/assets/folder-off.svg';
import FolderOnIcon from '../../../../public/assets/folder-on.svg';
import SectionOffIcon from '../../../../public/assets/section-off.svg';
import SectionOnIcon from '../../../../public/assets/section-on.svg';

interface Board {
  [key: string]: string;
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
    iconOn: BoxOnIcon,
    iconOff: BoxOffIcon,
    link: '/teams/1',
  },
  calendar: {
    boardName: '나의 캘린더',
    iconOn: CalendarOnIcon,
    iconOff: CalendarOffIcon,
    link: '/schedules/1',
  },
  kanbanboard: {
    boardName: '칸반보드',
    iconOn: SectionOnIcon,
    iconOff: SectionOffIcon,
    link: '/myIssues/1',
  },
  board: {
    boardName: '자유게시판',
    iconOn: FolderOnIcon,
    iconOff: FolderOffIcon,
    link: '/teams/1/posts',
  },
};
