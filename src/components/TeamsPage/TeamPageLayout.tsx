import { Outlet } from 'react-router-dom';
import Board from '@/components/common/Board';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import TeamBar from '@/components/TeamsPage/TeamBar';
import { TeamProvider } from '@/contexts/TeamProvider';

export default function TeamPageLayout() {
  return (
    <TeamProvider>
      <div className="h-screen w-screen bg-gray20 pb-[2.4rem] pl-[28.4rem] pr-[2.4rem] pt-[14.2rem]">
        <Nav />
        <SideBar />
        <TeamBar />
        <Board>
          <Outlet />
        </Board>
      </div>
    </TeamProvider>
  );
}
