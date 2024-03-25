import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Board from '@/components/common/Board';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';

export default function UserPageLayout() {
  let isMain = false;

  const { pathname } = useLocation();
  if (pathname.includes('main')) isMain = true;

  return (
    <div
      className={clsx(
        'h-screen w-screen bg-gray20 pb-[4.4rem] pl-[28.4rem] pr-[2.4rem]',
        isMain ? 'pt-[8.2rem]' : 'pt-[8.6rem]',
      )}
    >
      <Nav />
      <SideBar />
      <Board>
        <Outlet />
      </Board>
    </div>
  );
}
