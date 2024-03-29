import { useEffect, useRef, useState } from 'react';
import calender from '../../../../public/assets/calendar-dark.svg';
import ModalCalendar from './ModalCalendar';
import ModalInput from './ModalInput';
import ModalLabel from './ModalLabel';
import ControlDate from '@/components/SchedulesPage/ControlDate';
import DateBox from '@/components/SchedulesPage/DateBox';

interface ModalCalendarInputProps {
  startHookform: any;
  startName: string;
  endHookform: any;
  endName: string;
}

export default function ModalCalendarInput({
  startHookform,
  startName,
  endHookform,
  endName,
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
      <ModalLabel htmlFor="date" label="날짜 (시작-종료)*" className={`${formTextSize}`} />
      <div className=" mb-12 mt-[0.9rem] flex items-center gap-2">
        <ModalInput
          hookform={startHookform}
          type="text"
          name={startName}
          id="date"
          className={`${formTextSize} ${borderStyle}`}
          placeholder="YYYY-MM-DD"
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
              className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]"
              ref={startDateToggleRef}
            >
              <ModalCalendar />
            </div>
          )}
        </ModalInput>

        <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
        {/* <div ref={endDateToggleRef}> */}
        <ModalInput
          hookform={endHookform}
          type="text"
          name={endName}
          id="date"
          className={`${formTextSize} ${borderStyle}`}
          placeholder="YYYY-MM-DD"
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
              className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]"
              ref={endDateToggleRef}
            >
              <ModalCalendar />
            </div>
          )}
        </ModalInput>
      </div>
      {/* </div> */}
    </>
  );
}
