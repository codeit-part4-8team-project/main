import { useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import { calendarContext } from '@/contexts/CalenarProvider';

interface AllDayProp {
  day: Date;
  mode: 'month' | 'modal';
}
function AllDay({ day, mode }: AllDayProp) {
  const { nowDate, filteredSchedules } = useContext(calendarContext);
  const Container =
    "w-full h-full flex justify-center items-center border-none 'last-of-type:rounded-bl-[2.4rem]'";
  const hover = 'hover:bg-gray10';
  const today = new Date();

  const notTodayStyle = 'text-gray50 ';
  // 오늘 날짜에 대한 스타일 클래스 결정
  let todayClass = '';
  if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth()) {
    todayClass = 'text-gray100'; // 배경색 스타일을 직접 지정
  }
  let notTodayClass = '';
  if (day.getDate() !== today.getDate()) {
    notTodayClass = notTodayStyle;
  }

  const notThisMonthClass = clsx({
    'text-gray30':
      day.getMonth() !== nowDate.getMonth() || day.getFullYear() !== nowDate.getFullYear(),
  });
  const numColumns = 7; // 그리드의 총 열 수 (일주일의 일수에 따라 달라질 수 있음)
  const columnIndex = day.getDay(); // 현재 요일의 열 인덱스 (0부터 시작)
  const isLastColumn = columnIndex === numColumns - 1;
  const daysInNextMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate(); //이전달의 첫번째 날
  const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getDate(); //현재 달의 일수
  const daysInPrevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate(); //다음 달의 마지막 날
  const rowIndex = (daysInNextMonth + currentDate + daysInPrevMonth) / 7;

  const DateDay = clsx(
    'bg-white w-full h-[16.2rem] text-body3-bold text-start py-4 px-[2.4rem] last:rouned-bl-[2.4rem]',

    todayClass,
    notTodayClass,
    notThisMonthClass,
    hover,
    {
      'border-r border-solid border-gray20': !isLastColumn,
      'border-t border-solid border-gray20': rowIndex > 1,
      'text-point_red': day.getDay() === 0 && !notThisMonthClass,
    },
  );
  const modalCell = clsx(
    'my-[0.2rem] mx-[0.4rem] w-[1.9rem] text-center',
    hover,
    todayClass,
    notThisMonthClass,
    {
      'text-point_red': day.getDay() === 0 && !notThisMonthClass,
    },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const convertToISODate = (dateTimeString: string): string => {
    const [date, time] = dateTimeString.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  };

  const filterData = useMemo(() => {
    return Array.isArray(filteredSchedules)
      ? filteredSchedules.filter((schedule) => {
          // startDateTime 및 endDateTime를 ISO 8601 형식으로 변환
          const scheduleStartDate = new Date(convertToISODate(schedule.startDateTime));
          const scheduleEndDate = new Date(convertToISODate(schedule.endDateTime));
          // 일정의 시작일과 종료일이 현재 날짜(day)의 범위에 속하는지 확인
          const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
          return scheduleStartDate <= dayEnd && scheduleEndDate >= dayStart;
        })
      : [];
  }, [filteredSchedules, day]);

  const renderSchedules = () => {
    return filterData.map((schedule, index) => (
      <div key={index}>
        <p>{schedule.title}</p>
        <p>{schedule.content}</p>
      </div>
    ));
  };

  return (
    <>
      {mode === 'month' && (
        <div className={`${Container} 'last: rounded-bl-[2.4rem]'`}>
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
