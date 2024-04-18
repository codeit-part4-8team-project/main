import SendIcon from '@/assets/SendIcon';

export default function ChatInput() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white px-12 pb-[5.4rem]">
      <div className="flex h-[4.4rem] items-center justify-between rounded-[0.4rem] bg-gray10 px-8">
        <input
          placeholder="메세지를 입력하세요"
          className="w-full border-none bg-gray10 text-body3-regular text-gray100 placeholder:text-gray50 focus:outline-none"
        />
        <SendIcon />
      </div>
    </div>
  );
}
