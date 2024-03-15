import { useState } from 'react';
import ArrowDownIcon from '../../../public/assets/arrow-down-dark.png';
import CheckIcon from '../../../public/assets/check-circle-dark.svg';
import CloseIcon from '../../../public/assets/hidden-dark.svg';
import ProfileImg from '../../../public/assets/profile-small.svg';
import NoCard from '../common/NoCard';

const content =
  '떠나는 길에 니가 내게 말했지. 너는 바라는 게 너무나 많아. 잠깐이라도 널 안 바라보면 머리에 불이 나버린다니까 나는 흐르려는 눈물을 참고 하려던 얘길 어렵게 누르고 그래 미안해 라는 한 마디로 너랑 나눈 날들 마무리했었지 달디달고 달디달고 달디단 밤양갱 밤양갱 내가 먹고 싶었던 건 달디단 밤양갱 밤양갱이야 떠나는 길에 니가 내게 말했지 너는 바라는 게 너무나 많아 아냐 내가 늘 바란 건 하나야';
const shortened = content.substring(0, 75) + '...';

export default function AnnouncementCards() {
  const hasCard = false;

  return (
    <div className="flex h-full w-full flex-col gap-[2.4rem] overflow-scroll">
      {hasCard ? (
        <>
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
        </>
      ) : (
        <NoCard backgroundColor="white">공지사항이 없습니다.</NoCard>
      )}
    </div>
  );
}

function AnnouncementCard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex w-full flex-col gap-[1.7rem] rounded-[2.4rem] bg-[#ECF619] p-[2.4rem]">
      <span className="text-body3-bold text-gray100">디자인 스터디</span>
      <span className="text-body3-regular text-gray100">{isOpen ? content : shortened}</span>
      <span className="text-body5-regular text-black opacity-30">게시 : 2024-03-04</span>
      <div className="absolute right-[2.4rem] top-[2.4rem] flex items-center gap-[0.8rem]">
        <button type="button">
          <img className="h-[2.4rem] w-[2.4rem]" src={CheckIcon} alt="체크 버튼" />
        </button>
        <button type="button" onClick={handleToggleContent}>
          {isOpen ? (
            <img className="m-[0.4rem] w-[1.6rem] opacity-65" src={CloseIcon} alt="닫힘 아이콘" />
          ) : (
            <img className="h-[2.4rem] w-[2.4rem]" src={ArrowDownIcon} alt="펼치기 아이콘" />
          )}
        </button>
      </div>
      <button type="button">
        <img
          className="absolute bottom-[2.4rem] right-[2.4rem] h-[2.4rem] w-[2.4rem]"
          src={ProfileImg}
          alt="프로필 이미지"
        />
      </button>
    </div>
  );
}
