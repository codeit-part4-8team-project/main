import { useState } from 'react';
import clsx from 'clsx';
import { toDateFormat } from '@/lib/formatDate';
import { Announcement } from '@/types/announcementTypes';
import { Team } from '@/types/teamTypes';
import AllowDownIcon from '@/assets/AllowDownIcon';
import ClosedIcon from '@/assets/ClosedIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import PinAngleIcon from '@/assets/PinAngleIcon';

interface AnnouncementItemProps {
  announcement: Announcement;
  team?: Team;
}

export default function AnnouncementItem({
  announcement: { title, content, createdDate, pinned },
  team,
}: AnnouncementItemProps) {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleContent = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      style={{ backgroundColor: team?.color || 'white' }}
      className="relative flex w-full flex-col gap-[1.7rem] rounded-[2.4rem] p-[2.4rem]"
    >
      <span className="text-body3-bold text-gray100">{title}</span>
      <span
        className={clsx(
          'inline-block h-[4.4rem] overflow-hidden text-body3-regular text-gray100',
          isHidden ? 'h-[4.4rem]' : 'h-fit',
        )}
      >
        {content}
      </span>
      <span className="text-body5-regular text-black opacity-30">{toDateFormat(createdDate)}</span>
      <div className="absolute right-[2.4rem] top-[2.4rem] flex items-center gap-[0.8rem]">
        {pinned && (
          <button type="button">
            <PinAngleIcon />
          </button>
        )}
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
