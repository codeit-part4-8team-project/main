import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EntrancePageLayout from './components/common/EntrancePageLayout';
import NotFound from './pages/NotFound';
import PrivateRoutes from './routes/PrivateRoutes';
import LoadingPage from '@/pages/LoadingPage';
import PageLayout from '@/components/common/PageLayout';
import { CalendarProvider } from '@/contexts/CalenarProvider';
import ChatProvider from '@/contexts/ChatProvider';
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
            <ChatProvider>
              <Router>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/login/oauth2/code/:provider" element={<OauthRedirectPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route element={<EntrancePageLayout />}>
                    <Route path="/signin" element={<SigninPage />} />
                    <Route element={<PrivateRoutes />}>
                      <Route path="/signup" element={<SignupPage />} />
                    </Route>
                  </Route>
                  <Route element={<PrivateRoutes />}>
                    <Route path="/user/:userId" element={<PageLayout type="user" />}>
                      <Route path=":pageContent" element={<UserPage />} />
                    </Route>
                    <Route path="/team/:teamId" element={<PageLayout type="team" />}>
                      <Route path=":pageContent" element={<TeamPage />} />
                    </Route>
                  </Route>
                </Routes>
              </Router>
            </ChatProvider>
          </ModalProvider>
        </CalendarProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
