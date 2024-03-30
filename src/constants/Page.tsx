import { ReactNode } from 'react';
import SchedulesPage from '@/pages/SchedulesPage';
import UserIssuesPage from '@/pages/UserIssuesPage';
import UserMainPage from '@/pages/UserMainPage';
import UserMyPage from '@/pages/UserMyPage';
import UserPostsPage from '@/pages/UserPostsPage';
import TeamAnnouncementsPage from '@/pages/team/TeamAnnouncementsPage';
import TeamCalendar from '@/pages/team/TeamCalendar';
import TeamIssuesPage from '@/pages/team/TeamIssuesPage';
import TeamMainPage from '@/pages/team/TeamMainPage';
import TeamMembers from '@/pages/team/TeamMembers';
import TeamPostsPage from '@/pages/team/TeamPostsPage';
import BoxIcon from '@/assets/BoxIcon';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import MegaphoneIcon from '@/assets/MegaphoneIcon';
import PeopleIcon from '@/assets/PeopleIcon';
import ViewListIcon from '@/assets/ViewListIcon';

export type UserPageType = 'main' | 'schedule' | 'issue' | 'post' | 'myPage';
export type TeamPageType = 'main' | 'schedule' | 'issue' | 'post' | 'announcement' | 'member';
// type PageType = UserPageType | TeamPageType; /* 필요할 때 주석 해제 */

export interface Page {
  title: string;
  page: ReactNode;
  icon: ReactNode;
}
export type PageByType<T extends string | number | symbol> = {
  [page in T]: Page;
};

export interface Pages {
  user: PageByType<UserPageType>;
  team: PageByType<TeamPageType>;
}

export const PAGES: Pages = {
  user: {
    main: {
      title: '대시보드',
      page: <UserMainPage />,
      icon: <BoxIcon />,
    },
    schedule: {
      title: '나의 캘린더',
      page: <SchedulesPage />,
      icon: <CalendarIcon />,
    },
    issue: {
      title: '칸반보드',
      page: <UserIssuesPage />,
      icon: <ViewListIcon />,
    },
    post: {
      title: '자유게시판',
      page: <UserPostsPage />,
      icon: <FolderIcon />,
    },
    myPage: {
      title: '마이페이지',
      page: <UserMyPage />,
      icon: <CalendarIcon /> /* TODO 디자인 나오는대로 아이콘 변경 필요 */,
    },
  },
  team: {
    main: {
      title: '홈',
      page: <TeamMainPage />,
      icon: <BoxIcon />,
    },
    schedule: {
      title: '팀 캘린더',
      page: <TeamCalendar />,
      icon: <CalendarIcon />,
    },
    issue: {
      title: '칸반보드',
      page: <TeamIssuesPage />,
      icon: <ViewListIcon />,
    },
    announcement: {
      title: '공지사항',
      page: <TeamAnnouncementsPage />,
      icon: <MegaphoneIcon />,
    },
    post: {
      title: '자유게시판',
      page: <TeamPostsPage />,
      icon: <FolderIcon />,
    },
    member: {
      title: '팀원',
      page: <TeamMembers />,
      icon: <PeopleIcon />,
    },
  },
};
