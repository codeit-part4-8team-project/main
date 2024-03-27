import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import OauthRedirectPage from '@/pages/OauthRedirectPage';
import SigninPage from '@/pages/SigninPage';
import SignupPage from '@/pages/SignupPage';
import UserPage from '@/pages/UserPage';
import TeamPage from '@/pages/team/TeamPage';
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
              <Route path="/user/:userId" element={<UserPageLayout />}>
                <Route path=":pageContent" element={<UserPage />} />
              </Route>
              <Route path="/teams/:teamsId" element={<TeamPageLayout />}>
                <Route path=":pageContent" element={<TeamPage />} />
              </Route>
            </Routes>
          </Router>
        </CalendarProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
