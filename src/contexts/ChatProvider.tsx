import {
  ReactNode,
  ReactPortal,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Chat } from '@/components/chat/Chat';
import { ChatList } from '@/components/chat/ChatList';

interface ChatProviderProps {
  children: ReactNode;
}

type ChatPage = 'list' | 'chat' | null;

interface ChatContextValues {
  currentPage: ChatPage;
  setCurrentPage: (page: ChatPage) => void;
  chatPortal?: ReactPortal | null;
  handleCloseClick?: () => void;
  chatRef: RefObject<HTMLDivElement> | null;
}

const defaultValues: ChatContextValues = {
  currentPage: 'list',
  setCurrentPage: () => {},
  chatRef: null,
};

const ChatContext = createContext<ChatContextValues>(defaultValues);

export default function ChatProvider({ children }: ChatProviderProps) {
  const [currentPage, setCurrentPage] = useState<ChatPage>(null);
  const [currentPageEl, setCurrentPageEl] = useState<ReactNode | null>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPage === 'list') setCurrentPageEl(<ChatList ref={chatRef} />);
    if (currentPage === 'chat') setCurrentPageEl(<Chat ref={chatRef} />);
  }, [currentPage]);

  const el = document.getElementById('chat');
  if (!el) return;

  const chatPortal = createPortal(
    <div className="absolute inset-0 h-screen">{currentPageEl}</div>,
    el,
  );

  const handleCloseClick = () => {
    setCurrentPage(null);
  };

  const value: ChatContextValues = {
    currentPage,
    setCurrentPage,
    chatPortal,
    handleCloseClick,
    chatRef,
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
