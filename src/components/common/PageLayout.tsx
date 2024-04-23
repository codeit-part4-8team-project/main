import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import Board from '@/components/common/Board';
import FloatingButton from '@/components/common/FloatingButton';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import TeamBar from '@/components/TeamsPage/TeamBar';
import { useChat } from '@/contexts/ChatProvider';
import { TeamProvider } from '@/contexts/TeamProvider';

interface PageLayoutProps {
  type: 'user' | 'team';
}

export default function PageLayout({ type }: PageLayoutProps) {
  const { setCurrentPage, chatPortal } = useChat();

  const handleChatClick = () => {
    setCurrentPage('list');
  };

  const isChatOpen = chatPortal ? true : false;

  return (
    <TeamProvider>
      <div
        className={clsx(
          'h-screen w-screen bg-gray20 pb-[2.4rem] pl-[28.4rem] pr-[2.4rem]',
          type === 'team' ? 'pt-[14.2rem]' : 'pt-[8.6rem]',
        )}
      >
        <Nav />
        <SideBar />
        {type === 'team' && <TeamBar />}
        <Board>
          <Outlet />
        </Board>
        {isChatOpen && chatPortal}
        <FloatingButton onClick={handleChatClick} />
      </div>
    </TeamProvider>
  );
}
