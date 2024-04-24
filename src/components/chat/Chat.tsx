import { forwardRef } from 'react';
import ChatBody from '@/components/chat/ChatBody';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';

export const Chat = forwardRef<HTMLDivElement>(function Chat(_, ref) {
  return (
    <div ref={ref} className="fixed bottom-0 right-0 top-[5.8rem] z-50 flex w-[49.7rem] bg-white">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
});
