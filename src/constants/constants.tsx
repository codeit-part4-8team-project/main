import { ReactNode } from 'react';
import MainPage from '@/pages/MainPage';
import MyIssuesPage from '@/pages/MyIssuesPage';
import MyPage from '@/pages/MyPage';
import MyPostsPage from '@/pages/MyPostsPage';
import SchedulesPage from '@/pages/SchedulesPage';
import TeamAnnouncementPage from '@/pages/team/TeamAnnouncementPage';
import TeamCalendar from '@/pages/team/TeamCalendar';
import TeamHome from '@/pages/team/TeamHome';
import TeamIssuesPage from '@/pages/team/TeamIssuesPage';
import TeamMembers from '@/pages/team/TeamMembers';
import TeamPostsPage from '@/pages/team/TeamPostsPage';

export interface Pages {
  [page: string]: ReactNode;
}

export const PAGES: {
  user: Pages;
  team: Pages;
} = {
  user: {
    main: <MainPage />,
    schedules: <SchedulesPage />,
    issues: <MyIssuesPage />,
    posts: <MyPostsPage />,
    myPage: <MyPage />,
  },
  team: {
    main: <TeamHome />,
    schedules: <TeamCalendar />,
    issues: <TeamIssuesPage />,
    announcements: <TeamAnnouncementPage />,
    posts: <TeamPostsPage />,
    // members: <TeamMembers />,
  },
};
