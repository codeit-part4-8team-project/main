import { ReactNode } from 'react';
import clsx from 'clsx';
import calendar from '../../../../public/assets/calendar-dark.svg';
import close from '../../../../public/assets/close.svg';
import people from '../../../../public/assets/people-fill.svg';

interface ModalProps {
  children?: ReactNode;
  closeClick?: () => void;
  onClick?: (e: any) => void;
  title: string;
  size?: 'lg' | 'md' | 'sm';
}
function ModalLayout({ children, closeClick, title, onClick, size = 'lg' }: ModalProps) {
  const container = clsx({
    'relative h-[109.3rem] w-[49.7rem] bg-white p-16': size === 'lg',
    'relative h-[74rem] w-[49.7rem] bg-white p-16 rounded-[2.4rem]': size === 'md',
    'relative h-[59.1rem] w-[49.7rem] bg-white p-16 rounded-[2.4rem]': size === 'sm',
  });
  return (
    <div className="flex size-full items-center justify-center bg-black bg-opacity-5">
      <div className={`${container}`} onClick={onClick}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[1.8rem] font-bold">
            {title == '일정 추가' ? (
              <img src={calendar} alt="캘린더" />
            ) : (
              <img src={people} alt="사람들" />
            )}

            {title}
          </div>
          <button onClick={closeClick}>
            <img src={close} alt="closeButton" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export default ModalLayout;
