import { ReactNode, ReactPortal, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Chat from '@/components/chat/Chat';
import ChatList from '@/components/chat/ChatList';

interface ChatProviderProps {
  children: ReactNode;
}

type ChatPage = 'list' | 'chat' | null;

interface ChatContextValues {
  currentPage: ChatPage;
  setCurrentPage: (page: ChatPage) => void;
  chatPortal?: ReactPortal | null;
  handleCloseClick?: () => void;
}

const defaultValues: ChatContextValues = {
  currentPage: 'list',
  setCurrentPage: () => {},
};

const ChatContext = createContext<ChatContextValues>(defaultValues);

export default function ChatProvider({ children }: ChatProviderProps) {
  const [currentPage, setCurrentPage] = useState<ChatPage>('list');

  let chatPageEl = null;
  if (currentPage === 'list') chatPageEl = <ChatList />;
  if (currentPage === 'chat') chatPageEl = <Chat />;

  const el = document.getElementById('chat');
  if (!el) return;

  const chatPortal = createPortal(chatPageEl, el);

  const handleCloseClick = () => {
    setCurrentPage(null);
  };

  const value: ChatContextValues = {
    currentPage,
    setCurrentPage,
    chatPortal,
    handleCloseClick,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw Error('반드시 ChatProvider 안에서 사용해야 합니다.');
  }

  return context;
}
