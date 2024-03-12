import { useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';

interface Props {
  day: Date;
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

function AllDay({ day, nowDate, setNowDate }: Props) {
  const Container = 'w-full flex justify-center items-center rounded-[2.4rem] border-none ';
  const hover = 'hover:bg-[#D1D5DB]';
  const today = new Date();
  const todayStyle = 'text-[#292929] bg-[#F7F7F7]';
  const notTodayStyle = 'text-[#A1A1A1]';

  // 오늘 날짜에 대한 스타일 클래스 결정
  let todayClass = '';
  if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth()) {
    todayClass = todayStyle;
  }
  let notTodayClass = '';
  if (day.getDate() !== today.getDate()) {
    notTodayClass = notTodayStyle;
  }

  // 해당 월이 아닌 경우에 대한 클래스 결합
  const notThisMonthClass = clsx({
    'text-[#E5E5E5]':
      day.getMonth() !== nowDate.getMonth() || day.getFullYear() !== nowDate.getFullYear(),
  });

  // 날짜에 대한 클래스 결합
  const DateDay = clsx(
    ' text-[1.4rem] font-bold text-center p-4 border-b border-dashed border-gray-300',
    todayClass,
    notTodayClass,
    notThisMonthClass,
  );
  const numColumns = 7; // 그리드의 총 열 수 (일주일의 일수에 따라 달라질 수 있음)
  const numRows = 12;
  const columnIndex = day.getDay(); // 현재 요일의 열 인덱스 (0부터 시작)
  const isLastColumn = columnIndex === numColumns - 1;

  const rowIndex = day.getDay();
  const isLawRow = rowIndex === numRows - 1;
  const cell = clsx(
    'w-[15.5rem] h-[16rem] bg-[#FCFCFC] border-t border-dashed border-gray-300',
    hover,
    {
      'border-r border-dashed border-gray-300': !isLastColumn,
      'border-b border-dashed border-gray-300': isLawRow,
    },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getWeekDay = (dayIndex: number): string => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekDays[dayIndex];
  };

  return (
    <div className={Container}>
      <div className={cell}>
        <p
          onClick={openModal}
          className={DateDay}
        >{`${day.getMonth() + 1}월 ${day.getDate()} 일 (${getWeekDay(day.getDay())})`}</p>
        {isModalOpen && <ScheduleModal />}
      </div>
    </div>
  );
}

export default AllDay;
