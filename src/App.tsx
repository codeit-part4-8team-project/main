import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import UserPageLayout from '@/components/common/UserPageLayout';
import TeamPageLayout from '@/components/TeamsPage/TeamPageLayout';
import { CalendarProvider } from '@/contexts/CalenarProvider';
import { ModalProvider } from '@/contexts/ModalProvider';
import { StepProvider } from '@/contexts/SignupStepProvider';
import { UserProvider } from '@/contexts/UserProvider';

const HomePage = lazy(() => import('@/pages/HomePage'));
const OauthRedirectPage = lazy(() => import('@/pages/OauthRedirectPage'));
const SigninPage = lazy(() => import('@/pages/SigninPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const TeamPage = lazy(() => import('@/pages/team/TeamPage'));

function App() {
  return (
    <Suspense fallback={<div>로딩 중</div>}>
      <UserProvider>
        <ModalProvider>
          <CalendarProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/login/oauth2/code/:provider" element={<OauthRedirectPage />} />
                <Route element={<PrivateRoutes />}>
                  <Route
                    path="/signup"
                    element={
                      <StepProvider>
                        <SignupPage />
                      </StepProvider>
                    }
                  />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/user/:userId" element={<UserPageLayout />}>
                    <Route path=":pageContent" element={<UserPage />} />
                  </Route>
                  <Route path="/team/:teamId" element={<TeamPageLayout />}>
                    <Route path=":pageContent" element={<TeamPage />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </CalendarProvider>
        </ModalProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
