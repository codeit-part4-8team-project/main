import { createPortal } from 'react-dom';
import Chat from '@/components/chat/Chat';
import ChatList from '@/components/chat/ChatList';
import { useChat } from '@/contexts/ChatProvider';

export default function ChatPopup() {
  const { currentPage } = useChat();

  const chatPage = currentPage === 'list' ? <ChatList /> : <Chat />;

  const el = document.getElementById('chat');
  if (!el) return;

  return createPortal(chatPage, el);
}
