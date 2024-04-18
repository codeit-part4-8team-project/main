import { Outlet } from 'react-router-dom';
import Board from '@/components/common/Board';
import FloatingButton from '@/components/common/FloatingButton';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';

export default function UserPageLayout() {
  return (
    <div className="h-screen w-screen bg-gray20 pb-[2.4rem] pl-[28.4rem] pr-[2.4rem] pt-[8.6rem]">
      <Nav />
      <SideBar />
      <Board>
        <Outlet />
      </Board>
      <FloatingButton />
    </div>
  );
}
