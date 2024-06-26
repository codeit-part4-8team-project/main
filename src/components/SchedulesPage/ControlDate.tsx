import { useContext } from 'react';
import clsx from 'clsx';
import { calendarContext } from '@/contexts/CalenarProvider';
import ArrowLeftAll from '@/assets/assets/_allow-left-all.svg';
import ArrowLeft from '@/assets/assets/_allow-left.svg';
import ArrrowRightAll from '@/assets/assets/_allow-right-all.svg';
import ArrowRight from '@/assets/assets/_allow-right.svg';

interface ControlDateProp {
  mode: 'month' | 'week' | 'modal';
  className?: string;
}
function ControlDate({ mode }: ControlDateProp) {
  const Container = clsx('flex', 'items-center');
  const arrowButton = 'w-[2.4rem] h-[2.4rem] ';
  const DateText = clsx('text-body4-bold text-gray100 mx-[1.6rem]');
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
          <button className={`${arrowButton} mr-[0.4rem]`} onClick={() => changeMonth(-1)}>
            <img src={ArrowLeftAll} alt="이전 달 이동 아이콘" />
          </button>
          <button className={arrowButton} onClick={() => changeWeekCalendar(-1)}>
            <img src={ArrowLeft} alt="이전 주 이동 아이콘" />
          </button>

          <h1
            className={DateText}
          >{`${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate()} ~ ${endDate.getFullYear()}.${endDate.getMonth() + 1}. ${endDate.getDate()}`}</h1>
          <button className={`${arrowButton} mr-[0.4rem]`} onClick={() => changeWeekCalendar(1)}>
            <img src={ArrowRight} alt="다음 주 이동 아이콘" />
          </button>
          <button className={arrowButton} onClick={() => changeMonth(1)}>
            <img src={ArrrowRightAll} alt="다음 달 이동 아이콘" />
          </button>
        </div>
      )}
      {mode === 'modal' && (
        <div className={Container}>
          <button className={`${arrowButton} mr-[0.4rem]`} onClick={() => changeYear(-1)}>
            <img src={ArrowLeftAll} alt="이전 년도 이동 아이콘" />
          </button>
          <button className={arrowButton} onClick={() => changeMonth(-1)}>
            <img src={ArrowLeft} alt="이전 달 이동 아이콘" />
          </button>

          <h1 className=" mx-[4rem] w-[4.3rem] whitespace-nowrap text-body5-bold">{`${nowDate.getFullYear()}-${nowDate.getMonth() + 1}`}</h1>

          <button className={arrowButton} onClick={() => changeMonth(1)}>
            <img src={ArrowRight} alt="다음 달 이동 아이콘" />
          </button>
          <button className={`${arrowButton}ml-[0.4rem]`} onClick={() => changeYear(1)}>
            <img src={ArrrowRightAll} alt="다음 년도 이동 아이콘" />
          </button>
        </div>
      )}
    </>
  );
}
export default ControlDate;
