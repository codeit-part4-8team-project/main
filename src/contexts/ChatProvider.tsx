import { ReactNode, createContext, useContext, useState } from 'react';

interface ChatProviderProps {
  children: ReactNode;
}

type ChatPage = 'list' | 'chat';

interface ChatContextValues {
  currentPage: ChatPage;
  setCurrentPage: (page: ChatPage) => void;
}

const defaultValues: ChatContextValues = {
  currentPage: 'list',
  setCurrentPage: () => {},
};

const ChatContext = createContext<ChatContextValues>(defaultValues);

export default function ChatProvider({ children }: ChatProviderProps) {
  const [currentPage, setCurrentPage] = useState<ChatPage>('list');

  const value: ChatContextValues = {
    currentPage,
    setCurrentPage,
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
