import { ReactNode } from 'react';
import Board from '@/components/common/Board';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import TeamBar from '@/components/TeamsPage/TeamBar';

interface PageLayoutProp {
  page?: 'main' | 'team';
  children: ReactNode;
}

export default function PageLayout({ page, children }: PageLayoutProp) {
  let paddingTop = 'pt-[8.6rem]';
  if (page === 'main') paddingTop = 'pt-[8.2rem]';
  if (page === 'team') paddingTop = 'pt-[14.2rem]';

  return (
    <div
      className={`h-screen w-screen bg-gray20 pb-[4.4rem] pl-[28.4rem] pr-[2.4rem] ${paddingTop}`}
    >
      <Nav />
      <SideBar />
      {page === 'team' && <TeamBar />}
      <Board>{children}</Board>
    </div>
  );
}
