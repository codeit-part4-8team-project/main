import ChatIcon from '@/assets/ChatIcon';

export default function FloatingButton() {
  return (
    <button
      type="button"
      className="fixed bottom-[5.3rem] right-[5.3rem] flex h-28 w-28 items-center justify-center rounded-full bg-gray100 shadow-[0_6.769px_16.923px_0_rgba(17,17,17,0.10);]"
    >
      <ChatIcon fill="white" />
    </button>
  );
}
