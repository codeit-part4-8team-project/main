import MyMessageItem from '@/components/chat/MyMessageItem';
import OthersMessageItem from '@/components/chat/OthersMessageItem';
import ProfileImg from '@/assets/assets/profile-small.svg';

export default function ChatBody() {
  return (
    <div className="mt-[9.6rem] flex w-full flex-col gap-[1.4rem] bg-white px-12 pt-10">
      <DateSeparator />
      <div className="flex items-start gap-4">
        <img src={ProfileImg} alt="유저 프로필 이미지" className="h-16 w-16 rounded-full" />
        <div>
          <OthersMessageItem>안녕하세요. 내 이름은 홍길동입니다.</OthersMessageItem>
          <OthersMessageItem>만나서 반가워요.</OthersMessageItem>
        </div>
      </div>
      <MyMessageItem>뭐고</MyMessageItem>
      <MyMessageItem>니 누군데</MyMessageItem>
    </div>
  );
}

function DateSeparator() {
  return (
    <div className="mb-[3.2rem] flex items-center">
      <hr className="h-[0.1rem] w-full border-gray20" />
      <span className="mx-[2.7rem] inline-block whitespace-nowrap text-body4-regular text-[#0E1726]">
        오늘, 2:09 PM
      </span>
      <hr className="h-[0.1rem] w-full border-gray20" />
    </div>
  );
}
