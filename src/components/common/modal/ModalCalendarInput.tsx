import { useEffect, useRef, useState } from 'react';
import ModalCalendar from './ModalCalendar';
import ModalInput from './ModalInput';
import ModalLabel from './ModalLabel';
import calender from '@/assets/assets/calendar-dark.svg';

interface ModalCalendarInputProps {
  startHookform: any;
  startDefaultValue?: string;
  startName: string;
  endHookform: any;
  endName: string;
  endDefaultValue?: string;
  startValue?: string;
  endValue?: string;
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
}

export default function ModalCalendarInput({
  startHookform,
  startName,
  startDefaultValue,
  endHookform,
  endName,
  endDefaultValue,
  startValue,
  endValue,
  onModalStartDateClick,
  onModalEndDateClick,
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
          defaultValue={startDefaultValue}
          hookform={startHookform}
          type="text"
          name={startName}
          id="date"
          className={`${formTextSize} ${borderStyle}`}
          placeholder="YYYY-MM-DD"
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
              className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]"
              ref={startDateToggleRef}
            >
              <ModalCalendar onModalDateClick={onModalStartDateClick} />
            </div>
          )}
        </ModalInput>

        <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
        <ModalInput
          defaultValue={endDefaultValue}
          hookform={endHookform}
          type="text"
          name={endName}
          id="date"
          className={`${formTextSize} ${borderStyle}`}
          placeholder="YYYY-MM-DD"
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
              className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]"
              ref={endDateToggleRef}
            >
              <ModalCalendar onModalDateClick={onModalEndDateClick} />
            </div>
          )}
        </ModalInput>
      </div>
      {/* </div> */}
    </>
  );
}
