import { useState } from 'react';
import clsx from 'clsx';
import AllowDownIcon from '@/assets/AllowDownIcon';
import ClosedIcon from '@/assets/ClosedIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import PinAngleIcon from '@/assets/PinAngleIcon';

const content =
  '떠나는 길에 니가 내게 말했지. 너는 바라는 게 너무나 많아. 잠깐이라도 널 안 바라보면 머리에 불이 나버린다니까 나는 흐르려는 눈물을 참고 하려던 얘길 어렵게 누르고 그래 미안해 라는 한 마디로 너랑 나눈 날들 마무리했었지 달디달고 달디달고 달디단 밤양갱 밤양갱 내가 먹고 싶었던 건 달디단 밤양갱 밤양갱이야 떠나는 길에 니가 내게 말했지 너는 바라는 게 너무나 많아 아냐 내가 늘 바란 건 하나야';

export default function AnnouncementItem() {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleContent = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="relative flex w-full flex-col gap-[1.7rem] rounded-[2.4rem] bg-[#ECF619] p-[2.4rem]">
      <span className="text-body3-bold text-gray100">디자인 스터디</span>
      <span
        className={clsx(
          'inline-block h-[4.4rem] overflow-hidden text-body3-regular text-gray100',
          isHidden ? 'h-[4.4rem]' : 'h-fit',
        )}
      >
        {content}
      </span>
      <span className="text-body5-regular text-black opacity-30">2024-03-04</span>
      <div className="absolute right-[2.4rem] top-[2.4rem] flex items-center gap-[0.8rem]">
        <button type="button">
          <PinAngleIcon />
        </button>
        <button type="button" onClick={handleToggleContent}>
          {isHidden ? (
            <AllowDownIcon />
          ) : (
            <ClosedIcon className="m-[0.4rem] w-[1.6rem] opacity-65" />
          )}
        </button>
        <button type="button">
          <MeatbollsIcon />
        </button>
      </div>
    </div>
  );
}
