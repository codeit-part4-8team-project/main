import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import MainPage from '@/pages/MainPage';
import MyIssuesPage from '@/pages/MyIssuesPage';
import MyPage from '@/pages/MyPage';
import MyPostsPage from '@/pages/MyPostsPage';
import OauthRedirectPage from '@/pages/OauthRedirectPage';
import SchedulesPage from '@/pages/SchedulesPage';
import SigninPage from '@/pages/SigninPage';
import SignupPage from '@/pages/SignupPage';
import TeamCalendar from '@/pages/team/TeamCalendar';
import TeamContents from '@/pages/team/TeamContents';
import TeamHome from '@/pages/team/TeamHome';
import TeamKanban from '@/pages/team/TeamKanban';
import TeamMembers from '@/pages/team/TeamMembers';
import TeamNotice from '@/pages/team/TeamNotice';
import TeamPostsPage from '@/pages/team/TeamPostsPage';
import UserPageLayout from '@/components/common/UserPageLayout';
import TeamPageLayout from '@/components/TeamsPage/TeamPageLayout';
import { CalendarProvider } from '@/contexts/CalenarProvider';
import { ModalProvider } from '@/contexts/ModalProvider';
import { StepProvider } from '@/contexts/SignupStepProvider';
import { UserProvider } from '@/contexts/UserProvider';

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <CalendarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/login/oauth2/code/:provider" element={<OauthRedirectPage />} />
              <Route
                path="/signup"
                element={
                  <StepProvider>
                    <SignupPage />
                  </StepProvider>
                }
              />
              <Route path="/user" element={<UserPageLayout />}>
                <Route path="main" element={<MainPage />} />
                <Route path="schedules/:userId" element={<SchedulesPage />} />
                <Route path="issues/:userId" element={<MyIssuesPage />} />
                <Route path="posts/:userId" element={<MyPostsPage />} />
                <Route path="myPage/:userId" element={<MyPage />} />
              </Route>
              <Route path="/teams/:teamsId" element={<TeamPageLayout />}>
                <Route path="main" element={<TeamHome />} />
                <Route path="schedules" element={<TeamCalendar />} />
                <Route path="issues" element={<TeamKanban />} />
                <Route path="notices" element={<TeamNotice />} />
                <Route path="posts" element={<TeamPostsPage />} />
                <Route path="members" element={<TeamMembers />} />
                <Route path="contents" element={<TeamContents />} />
              </Route>
            </Routes>
          </Router>
        </CalendarProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
