import ChatBody from '@/components/chat/ChatBody';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';

export default function Chat() {
  return (
    <div className="relative flex h-[102.2rem] w-[49.7rem] border-[0.2rem] bg-white">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
}
