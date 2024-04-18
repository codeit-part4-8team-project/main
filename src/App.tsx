import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EntrancePageLayout from './components/common/EntrancePageLayout';
import PrivateRoutes from './routes/PrivateRoutes';
import LoadingPage from '@/pages/LoadingPage';
import UserPageLayout from '@/components/common/UserPageLayout';
import TeamPageLayout from '@/components/TeamsPage/TeamPageLayout';
import { CalendarProvider } from '@/contexts/CalenarProvider';
import { ModalProvider } from '@/contexts/ModalProvider';
import { UserProvider } from '@/contexts/UserProvider';

const HomePage = lazy(() => import('@/pages/HomePage'));
const OauthRedirectPage = lazy(() => import('@/pages/OauthRedirectPage'));
const SigninPage = lazy(() => import('@/pages/SigninPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const TeamPage = lazy(() => import('@/pages/team/TeamPage'));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <UserProvider>
        <CalendarProvider>
          <ModalProvider>
            <Router>
              <Routes>
                <Route path="/login/oauth2/code/:provider" element={<OauthRedirectPage />} />
                <Route path="/" element={<HomePage />} />
                <Route element={<EntrancePageLayout />}>
                  <Route path="/signin" element={<SigninPage />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path="/signup" element={<SignupPage />} />
                  </Route>
                </Route>
                <Route element={<PrivateRoutes />}>
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
              </Routes>
            </Router>
          </ModalProvider>
        </CalendarProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
