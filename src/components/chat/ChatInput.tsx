import SendIcon from '@/assets/SendIcon';

export default function ChatInput() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[12.2rem] bg-white px-12 pb-[5.4rem] pt-[2.4rem] shadow-[0_-5px_10px_0_rgba(0,0,0,0.02)]">
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
