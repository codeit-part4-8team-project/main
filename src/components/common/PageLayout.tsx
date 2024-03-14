import { ReactNode } from 'react';
import Board from './Board';
import Nav from './Nav';
import SideBar from './sideBar/SideBar';

interface PageLayoutProp {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProp) {
  return (
    <div className="h-screen w-screen bg-gray20 pb-[4.4rem] pl-[28.4rem] pr-[2.4rem] pt-[8.2rem]">
      <Nav />
      <SideBar />
      <Board>{children}</Board>
    </div>
  );
}
