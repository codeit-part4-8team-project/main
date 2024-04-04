import { ReactNode } from 'react';
import deleteTrash from '@/assets/assets/Trash.svg';
import calendar from '@/assets/assets/calendar-dark.svg';
import close from '@/assets/assets/close.svg';
import people from '@/assets/assets/people-fill.svg';

interface ModalProps {
  children?: ReactNode;
  closeClick?: () => void;
  title: string;
  className?: string;
  detail?: boolean;
  deleteOnClick?: () => void;
}

function ModalLayout({
  children,
  closeClick,
  title,
  className,
  detail = false,
  deleteOnClick,
}: ModalProps) {
  return (
    <>
      <div className={`flex flex-col p-16 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[1.8rem] font-bold">
            {title == '일정 추가' ? (
              <img src={calendar} alt="캘린더" />
            ) : (
              <img src={people} alt="사람들" />
            )}

            {title}
          </div>
          {detail && (
            <button onClick={deleteOnClick}>
              <img src={deleteTrash} alt="deleteButton" />
            </button>
          )}
          <button onClick={closeClick}>
            <img src={close} alt="closeButton" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
export default ModalLayout;
