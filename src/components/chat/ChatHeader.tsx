import { useChat } from '@/contexts/ChatProvider';
import ArrowLeftIcon from '@/assets/ArrowLeftIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import ProfileImg from '@/assets/assets/profile-small.svg';

export default function ChatHeader() {
  const { setCurrentPage } = useChat();

  const handleBackClick = () => {
    setCurrentPage('list');
  };

  return (
    <div className="absolute left-0 right-0 top-0 flex h-[9.6rem] w-full items-center justify-between border-b-[0.1rem] border-gray20 px-12">
      <div className="flex items-center gap-[3.1rem]">
        <button type="button" onClick={handleBackClick}>
          <ArrowLeftIcon />
        </button>
        <div className="flex items-center gap-4">
          <img
            src={ProfileImg}
            alt="유저 프로필 이미지"
            className="h-[4.8rem] w-[4.8rem] rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-body3-bold text-gray100">홍길동</span>
            <span className="text-body5-regular text-gray80">@HONG_HONG</span>
          </div>
        </div>
      </div>
      <button type="button">
        <MeatbollsIcon />
      </button>
    </div>
  );
}
