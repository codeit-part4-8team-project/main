import { createPortal } from 'react-dom';
import Chat from '@/components/chat/Chat';

export default function ChatPopup() {
  const el = document.getElementById('chat');
  if (!el) return;
  return createPortal(<Chat />, el);
}
