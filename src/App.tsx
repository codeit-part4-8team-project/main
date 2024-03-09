import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalProvider';
import MyPage from './pages/MyPage';
import HomePage from '@/pages/HomePage';
import MainPage from '@/pages/MainPage';
import MyIssuesPage from '@/pages/MyIssuesPage';
import SchedulesPage from '@/pages/SchedulesPage';
import SigninPage from '@/pages/SigninPage';
import SignupPage from '@/pages/SignupPage';
import TeamSchedulesPage from '@/pages/TeamSchedulesPage';
import TeamsPage from '@/pages/TeamsPage';
import TeamsPostsPage from '@/pages/TeamsPostsPage';

function App() {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/schedules/:userId" element={<SchedulesPage />} />
          <Route path="/myIssues/:userId" element={<MyIssuesPage />} />
          <Route path="/teams">
            <Route path=":teamsId/schedules" element={<TeamSchedulesPage />} />
            <Route path=":teamsId" element={<TeamsPage />} />
            <Route path=":teamsId/posts" element={<TeamsPostsPage />} />
          </Route>
          <Route path="/myPage/:userId" element={<MyPage />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
