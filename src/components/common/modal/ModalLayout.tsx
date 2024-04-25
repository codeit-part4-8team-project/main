import { ReactNode } from 'react';
import ChatIcon from '@/assets/ChatIcon';
import Edit from '@/assets/assets/Edit.svg';
import DeleteTrash from '@/assets/assets/Trash.svg';
import calendar from '@/assets/assets/calendar-dark.svg';
import close from '@/assets/assets/close.svg';
import people from '@/assets/assets/people-fill.svg';

interface ModalProps {
  children?: ReactNode;
  closeClick?: () => void;
  title?: string;
  className?: string;
  detail?: boolean;
  deleteOnClick?: () => void;
  edit?: boolean;
  editOnClick?: () => void;
  onClick?: () => void;
  calendarType?: '나' | '팀';
}

export default function ModalLayout({
  children,
  closeClick,
  title,
  className,
  detail = false,
  deleteOnClick,
  edit,
  editOnClick,
  onClick,
}: ModalProps) {
  return (
    <>
      <div className={`flex flex-col p-16 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[1.8rem] font-bold">
            {(title === '일정 추가' || title === '일정') && <img src={calendar} alt="캘린더" />}
            {(title === '그룹 생성' ||
              title === '그룹 초대' ||
              title === '그룹 관리' ||
              title === '프로필 변경') && <img src={people} alt="사람들" />}
            {title === '채팅방 생성하기' && <ChatIcon />}

            {title}
          </div>

          <div className="flex gap-[1.6rem]" onClick={onClick}>
            {detail && (
              <button onClick={deleteOnClick}>
                <img src={DeleteTrash} alt="DeleteButton" />
              </button>
            )}
            {edit && (
              <button onClick={editOnClick}>
                <img src={Edit} alt="EditButton" />
              </button>
            )}
            <button onClick={closeClick}>
              <img src={close} alt="closeButton" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
