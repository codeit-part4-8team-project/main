import BlockOtherUserRoute from '@/routes/BlockOtherUserRoute';
import PrivateRoutes from '@/routes/PrivateRoutes';
import PublicRoutes from '@/routes/PublicRoutes';
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
        <CalendarProvider>
          <ModalProvider>
            <Router>
              <Routes>
                <Route element={<PublicRoutes />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signin" element={<SigninPage />} />
                  <Route path="/login/oauth2/code/:provider" element={<OauthRedirectPage />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route
                    path="/signup"
                    element={
                      <StepProvider>
                        <SignupPage />
                      </StepProvider>
                    }
                  />
                  <Route element={<BlockOtherUserRoute />}>
                    <Route path="/user/:userId" element={<UserPageLayout />}>
                      <Route path=":pageContent" element={<UserPage />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                      <Route path="/user/:userId" element={<UserPageLayout />}>
                        <Route path=":pageContent" element={<UserPage />} />
                      </Route>
                      <Route path="/team/:teamId" element={<TeamPageLayout />}>
                        <Route path=":pageContent" element={<TeamPage />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Router>
          </ModalProvider>
        </CalendarProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
