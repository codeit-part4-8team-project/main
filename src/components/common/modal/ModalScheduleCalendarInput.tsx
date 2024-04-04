import { useEffect, useRef, useState } from 'react';
import ModalCalendar from './ModalCalendar';
import ModalInput from './ModalInput';
import ModalLabel from './ModalLabel';
import { Time } from '@/components/SchedulesPage/Time';
import calender from '@/assets/assets/calendar-dark.svg';

interface ModalCalendarInputProps {
  startHookform: any;
  startName: string;
  endHookform: any;
  endName: string;
  startValue?: string; // 시작 날짜 값
  endValue?: string; // 종료 날짜 값
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
  onClickTime: (Time: string) => void;
}

export default function ModalScheduleCalendarInput({
  startHookform,
  startName,
  endHookform,
  endName,
  startValue,
  endValue,
  onModalStartDateClick,
  onModalEndDateClick,
  onClickTime,
}: ModalCalendarInputProps) {
  const startDateToggleRef = useRef<HTMLDivElement | null>(null);
  const endDateToggleRef = useRef<HTMLDivElement | null>(null);

  const [startDateToggle, setStartDateToggle] = useState(false);
  const [endDateToggle, setEndDateToggle] = useState(false);
  console.log(startDateToggle);
  const handleStartDateClick = () => {
    // setStartDateToggle(true);
    setStartDateToggle(!startDateToggle);
  };
  const handleEndDateClick = () => {
    setEndDateToggle(!endDateToggle);
    // setEndDateToggle(true);
  };

  const handleStartDateClickOutside = (e: MouseEvent) => {
    if (!startDateToggleRef.current?.contains(e.target as Node)) setStartDateToggle(false);
  };
  const handleEndDateClickOutside = (e: MouseEvent) => {
    if (!endDateToggleRef.current?.contains(e.target as Node)) setEndDateToggle(false);
  };

  useEffect(() => {
    if (startDateToggle) {
      document.addEventListener('mousedown', handleStartDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleStartDateClickOutside);
    };
  }, [startDateToggle]);

  useEffect(() => {
    if (endDateToggle) {
      document.addEventListener('mousedown', handleEndDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleEndDateClickOutside);
    };
  }, [endDateToggle]);

  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';

  return (
    <>
      <div className=" flex flex-col gap-[0.8rem]">
        <ModalLabel htmlFor={startName} label="날짜 시작" className={`${formTextSize}`} />
        <ModalInput
          hookform={startHookform}
          type="text"
          name={startName}
          id={startName}
          className={`${formTextSize} ${borderStyle}`}
          placeholder="날짜를 설정해 주세요."
          onModalDateClick={onModalStartDateClick}
          value={startValue}
        >
          <button
            className="absolute bottom-0 right-[1.8rem] top-0"
            onClick={handleStartDateClick}
            type="button"
          >
            <img src={calender} alt="캘린더" />
          </button>
          {startDateToggle && (
            <div
              className=" absolute right-0 top-20 z-50  w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem] shadow-[0_0_10px_0_rgba(17,17,17,0.05)]"
              ref={startDateToggleRef}
            >
              <ModalCalendar onModalDateClick={onModalStartDateClick} />
              <div className=" absolute right-0 top-[14rem] z-50 h-[19rem] w-[22.5rem] border-t-[0.1rem] border-gray50 bg-white px-[1.4rem] py-[1.3rem]">
                <Time onTimeClick={() => onClickTime} />
              </div>
            </div>
          )}
        </ModalInput>
      </div>
      <div className="mt-[3.8rem] flex flex-col gap-[0.8rem]">
        <ModalLabel htmlFor={endName} label="날짜 종료" className={`${formTextSize}`} />
        <ModalInput
          hookform={endHookform}
          type="text"
          name={endName}
          id={endName}
          className={`${formTextSize} ${borderStyle}`}
          placeholder="날짜를 설정해 주세요."
          onModalDateClick={onModalEndDateClick}
          value={endValue}
        >
          <button
            className="absolute bottom-0 right-[1.8rem] top-0"
            onClick={handleEndDateClick}
            type="button"
          >
            <img src={calender} alt="캘린더" />
          </button>
          {endDateToggle && (
            <div
              className=" absolute right-0 top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem] shadow-[0_0_10px_0_rgba(17,17,17,0.05)]"
              ref={endDateToggleRef}
            >
              <ModalCalendar onModalDateClick={onModalStartDateClick} />
              <div className=" absolute right-0 top-[14rem] z-50 h-[19rem] w-[22.5rem] border-t-[0.1rem] border-gray50 bg-white px-[1.4rem] py-[1.3rem]">
                <Time onTimeClick={() => onClickTime} />
              </div>
            </div>
          )}
        </ModalInput>
      </div>
    </>
  );
}
