import { forwardRef } from 'react';
import TextButton from '@/components/common/TextButton';
import ChatListItem from '@/components/chat/ChatListItem';
import { useChat } from '@/contexts/ChatProvider';
import ChatIcon from '@/assets/ChatIcon';
import CloseIcon from '@/assets/CloseIcon';

export const ChatList = forwardRef<HTMLDivElement>(function ChatList(_, ref) {
  const { handleCloseClick } = useChat();

  return (
    <div
      ref={ref}
      className="fixed bottom-0 right-0 top-[5.8rem] z-50 flex w-[49.7rem] flex-col gap-[3.8rem] bg-white px-16 pb-[5.2rem] pt-16"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.7rem]">
          <ChatIcon />
          <span className="text-body1-bold">채팅 목록</span>
        </div>
        <button type="button" onClick={handleCloseClick}>
          <CloseIcon />
        </button>
      </div>
      <div className="flex flex-auto flex-col gap-[1.6rem]">
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
      <TextButton buttonSize="md" color="white">
        1:1 채팅 생성하기
      </TextButton>
    </div>
  );
});
