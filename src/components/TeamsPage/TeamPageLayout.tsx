import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Board from '@/components/common/Board';
import FloatingButton from '@/components/common/FloatingButton';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import TeamBar from '@/components/TeamsPage/TeamBar';
import ChatList from '@/components/chat/ChatList';
import { ModalProvider } from '@/contexts/ModalProvider';
import { TeamProvider } from '@/contexts/TeamProvider';

export default function TeamPageLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <TeamProvider>
      <ModalProvider>
        <div className="h-screen w-screen bg-gray20 pb-[2.4rem] pl-[28.4rem] pr-[2.4rem] pt-[14.2rem]">
          <Nav />
          <SideBar />
          <TeamBar />
          <Board>
            <Outlet />
          </Board>
          {isChatOpen && <ChatList onCloseClick={handleChatClick} />}
          <FloatingButton onClick={handleChatClick} />
        </div>
      </ModalProvider>
    </TeamProvider>
  );
}
