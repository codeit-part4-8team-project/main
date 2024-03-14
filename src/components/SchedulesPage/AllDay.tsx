import { useContext, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import { calendarContext } from '@/contexts/CalenarProvider';

interface AllDayProp {
  day: Date;
}
function AllDay({ day }: AllDayProp) {
  const Container = 'w-full h-full flex justify-center items-center rounded-[2.4rem] border-none  ';
  const hover = 'hover:bg-[#D1D5DB]';
  const today = new Date();

  const notTodayStyle = 'text-[#A1A1A1] bg-[#FFF]';

  //Context
  const { nowDate } = useContext(calendarContext);

  // 오늘 날짜에 대한 스타일 클래스 결정
  let todayClass = '';
  if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth()) {
    todayClass = 'text-[#292929] bg-[#F7F7F7]'; // 배경색 스타일을 직접 지정
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
  const numColumns = 7; // 그리드의 총 열 수 (일주일의 일수에 따라 달라질 수 있음)
  const numRows = 12;
  const columnIndex = day.getDay(); // 현재 요일의 열 인덱스 (0부터 시작)
  const isLastColumn = columnIndex === numColumns - 1;

  const weekIndex = Math.floor((day.getDate() - 1) / 7); // 해당 날짜의 주 인덱스 계산
  const isLastRow = weekIndex === numRows - 1; // 해당 주가 마지막 주인지 여부 확인

  //const rowIndex = day.getDate();
  const isNotLastRow = !isLastRow;
  // 날짜에 대한 클래스 결합
  const DateDay = clsx(
    ' w-[15.3rem] h-[19.7rem] text-[1.4rem] font-bold text-start py-4 px-[2.4rem] ',
    todayClass,
    notTodayClass,
    notThisMonthClass,
    hover,
    {
      'border-r border-solid border-[#EFEFEF]': !isLastColumn,
      'border-t border-solid border-[#EFEFEF]': isNotLastRow,
      'text-[#F74242]': day.getDay() === 0,
    },
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={Container}>
      <div>
        <p onClick={openModal} className={DateDay}>{` ${day.getDate()} `}</p>
        {isModalOpen && <ScheduleModal />}
      </div>
    </div>
  );
}

export default AllDay;
