import { ReactNode, lazy } from 'react';
import { PageProvider } from '@/contexts/PageProvider';
import BoxIcon from '@/assets/BoxIcon';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import MegaphoneIcon from '@/assets/MegaphoneIcon';
import PeopleIcon from '@/assets/PeopleIcon';
import PersonIcon from '@/assets/PersonIcon';
import ViewListIcon from '@/assets/ViewListIcon';

export type UserPageType = 'main' | 'schedule' | 'issue' | 'post' | 'mypage';
export type TeamPageType = 'main' | 'schedule' | 'issue' | 'post' | 'announcement' | 'member';

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

const SchedulesPage = lazy(() => import('@/pages/SchedulesPage'));
const UserIssuesPage = lazy(() => import('@/pages/UserIssuesPage'));
const UserMainPage = lazy(() => import('@/pages/UserMainPage'));
const UserMyPage = lazy(() => import('@/pages/UserMyPage'));
const UserPostsPage = lazy(() => import('@/pages/UserPostsPage'));
const TeamAnnouncementsPage = lazy(() => import('@/pages/team/TeamAnnouncementsPage'));
const TeamCalendar = lazy(() => import('@/pages/team/TeamCalendar'));
const TeamIssuesPage = lazy(() => import('@/pages/team/TeamIssuesPage'));
const TeamMainPage = lazy(() => import('@/pages/team/TeamMainPage'));
const TeamMembers = lazy(() => import('@/pages/team/TeamMembers'));
const TeamPostsPage = lazy(() => import('@/pages/team/TeamPostsPage'));

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
      page: (
        <PageProvider>
          <UserPostsPage />
        </PageProvider>
      ),
      icon: <FolderIcon />,
    },
    mypage: {
      title: '마이페이지',
      page: (
        <PageProvider>
          <UserMyPage />
        </PageProvider>
      ),
      icon: <PersonIcon />,
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
      page: (
        <PageProvider>
          <TeamAnnouncementsPage />
        </PageProvider>
      ),
      icon: <MegaphoneIcon />,
    },
    post: {
      title: '자유게시판',
      page: (
        <PageProvider>
          <TeamPostsPage />
        </PageProvider>
      ),
      icon: <FolderIcon />,
    },
    member: {
      title: '팀원',
      page: (
        <PageProvider>
          <TeamMembers />
        </PageProvider>
      ),
      icon: <PeopleIcon />,
    },
  },
};
