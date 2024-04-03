import { useContext, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import AddScheudleModal from './AddScheduleModal';
import { Schedule } from '@/contexts/CalenarProvider';
import { calendarContext } from '@/contexts/CalenarProvider';

interface AllDayProp {
  day: Date;
  mode: 'month' | 'modal';
  calendarType?: '나' | '팀';
}
function AllDay({ day, mode, calendarType }: AllDayProp) {
  const { nowDate, filteredSchedules } = useContext(calendarContext);
  const [showAllSchedules, setShowAllSchedules] = useState(false);

  const Container =
    "w-full h-full flex justify-center items-center border-none 'last-of-type:rounded-bl-[2.4rem]' ";
  const hover = 'hover:bg-gray10  ';
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
    'bg-white w-full h-[16.2rem] text-body3-bold text-start py-4 px-[2.4rem] last:rouned-bl-[2.4rem]  ',

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
      ? filteredSchedules.filter((schedule: Schedule) => {
          const scheduleStartDate = new Date(
            convertToISODate(schedule.startDateTime && schedule.startDateTime),
          );
          const scheduleEndDate = new Date(convertToISODate(schedule.endDateTime));
          const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
          return scheduleStartDate <= dayEnd && scheduleEndDate >= dayStart;
        })
      : [];
  }, [filteredSchedules, day]);

  const renderSchedules = () => {
    if (filterData.length > 0) {
      // showAllSchedules 상태에 따라 모든 일정을 렌더링하거나 일부만 렌더링합니다.
      const schedulesToRender = showAllSchedules ? filterData : filterData.slice(0, 2);
      return schedulesToRender.map((schedule: Schedule, index: number) => (
        <div key={index}>
          <div className=" flex items-start gap-1">
            <div
              className="h-5 w-5 rounded-full"
              style={{
                backgroundColor: schedule.team?.color || 'black',
              }}
            ></div>
            <div>
              {calendarType === '나' ? (
                <>
                  <p className="text-gray100">{schedule.user?.name || schedule.team?.name}</p>
                  <p className="text-gray50">{schedule.title}</p>
                </>
              ) : (
                <>
                  <p className="text-gray100">{schedule.team?.name}</p>
                  <p className="text-gray50">{schedule.title}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ));
    }
  };
  useEffect(() => {
    // 모달이 열릴 때 body 요소에 overflow-hidden 스타일을 적용
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 overflow 스타일을 다시 제거
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 언마운트될 때 overflow 스타일을 초기화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const renderViewMoreButton = () => {
    const filteredSchedulesLength = filterData.length;
    const handleViewMoreClick = () => {
      setShowAllSchedules(true);
      openModal(); // 모달 열기
    };
    if (filteredSchedulesLength > 2 && !showAllSchedules) {
      return (
        <>
          <button
            className="text-blue-500 hover:text-blue-700 relative cursor-pointer"
            onClick={handleViewMoreClick}
          >
            <div className="ml-[0.1rem] text-body5-bold"> + 더보기</div>
          </button>
          {isModalOpen && (
            <AddScheudleModal className="fixed z-50" onClick={closeModal} content={filterData} />
          )}
        </>
      );
    }
  };

  return (
    <>
      {mode === 'month' && (
        <div className={`${Container} 'last: rounded-bl-[2.4rem]'`}>
          <div className={clsx(DateDay)}>
            {`${day.getDate()} `}
            {renderViewMoreButton()}

            {renderSchedules()}
          </div>
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
