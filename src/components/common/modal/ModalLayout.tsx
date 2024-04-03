import { ReactNode } from 'react';
import calendar from '../../../../public/assets/calendar-dark.svg';
import close from '../../../../public/assets/close.svg';
import people from '../../../../public/assets/people-fill.svg';

interface ModalProps {
  children?: ReactNode;
  closeClick?: () => void;
  title: string;
  className?: string;
}

function ModalLayout({ children, closeClick, title, className }: ModalProps) {
  return (
    <>
      <div className={`flex flex-col p-16 ${className}`}>
        {/* // <div className="flex size-full items-center justify-center bg-black bg-opacity-5"> */}
        {/* // <div className={`${container}`}> */}
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
        {/* </div> */}
        {/* // </div> */}
      </div>
    </>
  );
}
export default ModalLayout;
