import { ReactNode, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Chat from '@/components/chat/Chat';
import ChatList from '@/components/chat/ChatList';

interface ChatProviderProps {
  children: ReactNode;
}

type ChatPage = 'list' | 'chat';

interface ChatContextValues {
  currentPage: ChatPage;
  setCurrentPage: (page: ChatPage) => void;
  chatPortal?: React.ReactPortal | null;
}

const defaultValues: ChatContextValues = {
  currentPage: 'list',
  setCurrentPage: () => {},
};

const ChatContext = createContext<ChatContextValues>(defaultValues);

export default function ChatProvider({ children }: ChatProviderProps) {
  const [currentPage, setCurrentPage] = useState<ChatPage>('list');

  const chatPageEl = currentPage === 'list' ? <ChatList /> : <Chat />;
  const el = document.getElementById('chat');
  if (!el) return;

  const chatPortal = createPortal(chatPageEl, el);

  const value: ChatContextValues = {
    currentPage,
    setCurrentPage,
    chatPortal,
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
