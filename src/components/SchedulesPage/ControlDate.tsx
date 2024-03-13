import { useContext } from 'react';
import clsx from 'clsx';
import ArrowLeftAll from '../../../public/assets/_allow-left-all.svg';
import ArrowLeft from '../../../public/assets/_allow-left.svg';
import ArrrowRightAll from '../../../public/assets/_allow-right-all.svg';
import ArrowRight from '../../../public/assets/_allow-right.svg';
import { calendarContext } from '@/contexts/CalenarProvider';

interface ControlDateProp {
  mode: 'month' | 'week';
}
function ControlDate({ mode }: ControlDateProp) {
  const Container = clsx('w-full', 'flex', 'items-center');
  const arrowButton = 'w-[2.4rem] h-[2.4rem]';
  const DateText = clsx('font-bold text-[1.2rem] text-[#292929] mx-[1.6rem]');
  const { nowDate, setNowDate } = useContext(calendarContext);

  const changeYear = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setFullYear(date.getFullYear() + change);
    setNowDate(date);
  };
  const changeMonth = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setMonth(date.getMonth() + change);
    setNowDate(date);
  };

  const getWeekRange = (date: Date): [Date, Date] => {
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - diff - 1);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    return [startDate, endDate];
  };

  const changeWeekCalendar = (change: number) => {
    const today = new Date(nowDate.getTime());
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    today.setDate(today.getDate() - diff + 7 * change);
    setNowDate(today);
  };
  const [startDate, endDate] = getWeekRange(nowDate);
  return (
    <>
      {mode === 'month' && (
        <div className={Container}>
          <button className={`${arrowButton} mr-[0.4rem]`} onClick={() => changeYear(-1)}>
            <img src={ArrowLeftAll} alt="이전 년도 이동 아이콘" />
          </button>
          <button className={arrowButton} onClick={() => changeMonth(-1)}>
            <img src={ArrowLeft} alt="이전 달 이동 아이콘" />
          </button>

          <h1 className={DateText}>{`${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`}</h1>

          <button className={arrowButton} onClick={() => changeMonth(1)}>
            <img src={ArrowRight} alt="다음 달 이동 아이콘" />
          </button>
          <button className={`${arrowButton}mr-[0.4rem]`} onClick={() => changeYear(1)}>
            <img src={ArrrowRightAll} alt="다음 년도 이동 아이콘" />
          </button>
        </div>
      )}
      {mode === 'week' && (
        <div className={Container}>
          <button className={arrowButton} onClick={() => changeMonth(-1)}>{`<<`}</button>
          <button className={arrowButton} onClick={() => changeWeekCalendar(-1)}>{`<`}</button>

          <h1
            className={DateText}
          >{`${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate()} ~ ${endDate.getFullYear()}.${endDate.getMonth() + 1}. ${endDate.getDate()}`}</h1>
          <button className={arrowButton} onClick={() => changeWeekCalendar(1)}>{`>`}</button>
          <button className={arrowButton} onClick={() => changeMonth(1)}>{`>>`}</button>
        </div>
      )}
    </>
  );
}
export default ControlDate;
