import { MouseEventHandler, useRef, useState } from 'react';
import FreeBoardDetail from '@/components/Modal/FreeBoardDetail';
import { useModal } from '@/contexts/ModalProvider';
import { toDateFormat } from '@/lib/formatDate';
import { useAxios } from '@/hooks/useAxios';
import { Announcement } from '@/types/announcementTypes';
import Check2CircleIcon from '@/assets/Check2CircleIcon';
import PinAngleIcon from '@/assets/PinAngleIcon';
import ProfileImg from '@/assets/assets/profile-large.svg';

interface AnnouncementPageItemProps {
  announcement: Announcement;
}

export default function AnnouncementPageItem({ announcement }: AnnouncementPageItemProps) {
  const { id, author, title, content, createdDate, team, pinned } = announcement;
  const { color, name } = team;

  const [isChecked, setIsChecked] = useState(false);
  const checkRef = useRef<HTMLDivElement>(null);

  const openModal = useModal();

  const { fetchData: readAnnouncement } = useAxios({
    path: `/announcement/read/${id}`,
    method: 'PATCH',
  });

  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (checkRef?.current && !checkRef.current.contains(e.target as Node)) {
      openModal(({ close }) => (
        <FreeBoardDetail
          closeClick={close}
          postId={id}
          liked={false}
          likeCount={0}
        /> /* TODO 상세보기 모달 만들어지면 교체 */
      ));
    }
  };

  const handleCheckClick = async () => {
    setIsChecked(!isChecked);
    await readAnnouncement();
  };

  return (
    <div
      onClick={handleModalClick}
      className="relative flex h-[23.3rem] w-full cursor-pointer flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]"
    >
      <button type="button" className="absolute right-[2.4rem] top-[2.4rem]">
        {pinned && <PinAngleIcon />}
      </button>
      <div className="flex h-[3.6rem] items-center gap-[1.5rem]">
        <img
          src={author.imageUrl || ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[3.6rem] w-[3.6rem] rounded-full"
        />
        <div className="flex flex-col items-start gap-[0.4rem]">
          <div className="flex gap-[1.6rem]">
            <span className="text-body4-regular text-gray100">#{author.name}</span>
            <button
              style={{ color }}
              className={`bottom-8 left-8 flex h-[1.8rem] items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[0.8rem] font-medium`}
            >
              {name}
            </button>
          </div>
          <span className="text-body4-regular text-gray50">{toDateFormat(createdDate)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <span className="text-body4-bold text-gray100">{title}</span>
        <span className="inline-block h-[5.9rem] w-full overflow-auto text-body4-regular text-gray100">
          {content}
        </span>
      </div>
      <div
        onClick={handleCheckClick}
        ref={checkRef}
        className="absolute bottom-[2.4rem] left-[2.7rem] flex gap-[0.6rem]"
      >
        <Check2CircleIcon fill={isChecked ? '#292929' : '#E5E5E5'} />
      </div>
    </div>
  );
}
