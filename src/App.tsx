import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import HomePage from "@/pages/HomePage";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import SchedulesPage from "@/pages/SchedulesPage";
import TeamsPage from "@/pages/TeamsPage";
import TeamsPostsPage from "@/pages/TeamsPostsPage";
import MyIssuesPage from "@/pages/MyIssuesPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/schedules/:userId" element={<SchedulesPage />} />
        <Route path="/myIssues/:userId" element={<MyIssuesPage />} />
        <Route path="/teams">
          <Route path=":teamsId" element={<TeamsPage />} />
          <Route path=":teamsId/posts" element={<TeamsPostsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
