import { useState } from 'react';
import clsx from 'clsx';
import ItemDropDown from '@/components/common/ItemDropDown';
import { toDateFormat } from '@/lib/formatDate';
import { useAxios } from '@/hooks/useAxios';
import { Announcement } from '@/types/announcementTypes';
import { Team } from '@/types/teamTypes';
import AllowDownIcon from '@/assets/AllowDownIcon';
import ClosedIcon from '@/assets/ClosedIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import PinAngleIcon from '@/assets/PinAngleIcon';

interface AnnouncementItemProps {
  announcement: Announcement;
  type: 'main' | 'page';
  team?: Team;
}

export default function AnnouncementItem({
  announcement: { id, title, content, createdDate, pinned },
  type,
  team,
}: AnnouncementItemProps) {
  const [isPinned, setIsPinned] = useState(pinned);
  const [isHidden, setIsHidden] = useState(true);
  const [isDropped, setIsDropped] = useState(false);

  const handleDropDownOpen = () => {
    setIsDropped(!isDropped);
  };

  const handleToggleContent = () => {
    setIsHidden(!isHidden);
  };

  const dropDownOption = isPinned ? ['고정해제'] : ['고정하기'];

  const { fetchData: controlPin } = useAxios(
    {
      path: `/announcement/${isPinned ? 'unpin' : 'pin'}/${id}`,
      method: 'PATCH',
    },
    false,
  );

  const handlePinOptionClick = () => {
    setIsPinned(!isPinned);
    controlPin();
  };

  return (
    <div
      style={{ backgroundColor: team?.color || 'white' }}
      className={clsx(
        'relative flex flex-col gap-[1.7rem] rounded-[2.4rem] p-[2.4rem]',
        type === 'page' && 'h-[24.8rem] w-full',
        type === 'main' && 'w-full',
      )}
    >
      <span className="text-body3-bold text-gray100">{title}</span>
      <span
        className={clsx(
          'inline-block overflow-auto text-body3-regular text-gray100',
          type === 'main' && isHidden ? 'h-[4.4rem] overflow-hidden' : 'h-[13.2rem]',
        )}
      >
        {content}
      </span>
      <span className="text-body5-regular text-black opacity-30">{toDateFormat(createdDate)}</span>
      <div className="absolute right-[2.4rem] top-[2.4rem] flex items-center gap-[0.8rem]">
        {isPinned && (
          <button type="button">
            <PinAngleIcon />
          </button>
        )}
        {type === 'main' && (
          <button type="button" onClick={handleToggleContent}>
            {isHidden ? (
              <AllowDownIcon />
            ) : (
              <ClosedIcon className="m-[0.4rem] w-[1.6rem] opacity-65" />
            )}
          </button>
        )}
        <button type="button" onClick={handleDropDownOpen} className="relative">
          <MeatbollsIcon />
          {isDropped && <ItemDropDown options={dropDownOption} action={handlePinOptionClick} />}
        </button>
      </div>
    </div>
  );
}
