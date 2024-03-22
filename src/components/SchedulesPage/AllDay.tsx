import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import { Schedules } from './Schedules';
import { calendarContext } from '@/contexts/CalenarProvider';

interface AllDayProp {
  day: Date;
  mode: 'month' | 'modal';
  schedules?: Schedules[];
  filteredSchedules?: Schedules[];
}
function AllDay({ day, mode, schedules }: AllDayProp) {
  const { nowDate } = useContext(calendarContext);
  const Container = 'w-full h-full flex justify-center items-center rounded-[2.4rem] border-none ';
  const hover = 'hover:bg-[#F7F7F7]';
  const today = new Date();

  const notTodayStyle = 'text-[#A1A1A1] ';
  // 오늘 날짜에 대한 스타일 클래스 결정
  let todayClass = '';
  if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth()) {
    todayClass = 'text-[black]'; // 배경색 스타일을 직접 지정
  }
  let notTodayClass = '';
  if (day.getDate() !== today.getDate()) {
    notTodayClass = notTodayStyle;
  }

  const notThisMonthClass = clsx({
    'text-[#E5E5E5]':
      day.getMonth() !== nowDate.getMonth() || day.getFullYear() !== nowDate.getFullYear(),
  });
  const numColumns = 7; // 그리드의 총 열 수 (일주일의 일수에 따라 달라질 수 있음)
  const columnIndex = day.getDay(); // 현재 요일의 열 인덱스 (0부터 시작)
  const isLastColumn = columnIndex === numColumns - 1;
  const numRows = 5;
  const daysInNextMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate(); //이전달의 첫번째 날
  const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getDate(); //현재 달의 일수
  const daysInPrevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate(); //다음 달의 마지막 날
  const rowIndex = (daysInNextMonth + currentDate + daysInPrevMonth) / 7;

  const numDaysInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate(); // 현재 월의 일수
  const numWeeksInMonth = Math.ceil((numDaysInMonth + day.getDay()) / 7); // 현재 월의 주 수

  const isLastRow = rowIndex === numWeeksInMonth;
  const isLastOfType = rowIndex === numRows;
  const DateDay = clsx(
    'bg-[#FFF] w-full h-[16.2rem] text-body3-bold text-start py-4 px-[2.4rem] ',

    todayClass,
    notTodayClass,
    notThisMonthClass,
    hover,
    {
      'border-r border-solid border-[#EFEFEF]': !isLastColumn,
      'border-b border-solid border-[#EFEFEF]': !isLastRow,
      'rounded-bl-[2.4rem]': columnIndex === 0 && isLastRow,
      'last: rounded-br-[2.4rem]': isLastOfType,
      'text-[#F74242]': day.getDay() === 0 && !notThisMonthClass,
    },
  );
  const modalCell = clsx(
    'my-[0.2rem] mx-[0.4rem] w-[1.9rem] text-center text-[#A1A1A1] ',
    hover,
    todayClass,
    notThisMonthClass,
    {
      'text-[#F74242]': day.getDay() === 0 && !notThisMonthClass,
    },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const filteredSchedules = Array.isArray(schedules)
    ? schedules.filter((schedule) => {
        const scheduleStartDate = new Date(schedule.startDateTime); // schedules 대신 schedule로 수정
        const scheduleEndDate = new Date(schedule.endDateTime); // schedules 대신 schedule로 수정
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        return scheduleStartDate <= dayEnd && scheduleEndDate >= dayStart;
      })
    : [];

  const renderSchedules = () => {
    return (filteredSchedules ?? []).map((schedule, index) => (
      <div key={index}>
        <p>{schedule.title}</p>
        <p>{schedule.content}</p>
      </div>
    ));
  };
  return (
    <>
      {mode === 'month' && (
        <div className={Container}>
          <div onClick={openModal} className={clsx(DateDay)}>
            {`${day.getDate()} `}
            {renderSchedules()}
          </div>
          {isModalOpen && <ScheduleModal />}
        </div>
      )}

      {mode === 'modal' && (
        <div>
          <p className={modalCell}>{` ${day.getDate()} `}</p>
        </div>
      )}
    </>
  );
}

export default AllDay;
