import { MouseEvent, useContext, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import AddScheudleModal from './AddScheduleModal';
import ScheduleDeleteModal from './ScheduleDeleteModal';
import { Schedule } from '@/contexts/CalenarProvider';
import { calendarContext } from '@/contexts/CalenarProvider';
import { useModal } from '@/contexts/ModalProvider';

interface AllDayProp {
  day: Date;
  mode: 'month' | 'modal';
  calendarType?: '나' | '팀';
  onModalDateClick?: (date: string) => void;
}

function AllDay({ day, mode, calendarType, onModalDateClick }: AllDayProp) {
  const { nowDate, filteredSchedules, teamId } = useContext(calendarContext);
  const [showAllSchedules, setShowAllSchedules] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null); // 선택된 스케줄 상태 추가
  const ModalRef = useRef<HTMLDivElement>(null);
  const Container =
    "w-full h-full flex justify-center items-center border-none relative 'last-of-type:rounded-bl-[2.4rem]' ";
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
  const openModal = useModal();
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

  const closeModal = () => {
    setIsModalOpen(false);
    setShowAllSchedules(false);
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

  const handleOpenDeleteModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);

    if (calendarType === '나') {
      openModal(({ close }) => (
        <ScheduleDeleteModal user={true} closeClick={close} selectedSchedule={schedule} />
      ));
    } else {
      openModal(({ close }) => (
        <ScheduleDeleteModal
          team={true}
          closeClick={close}
          teamId={teamId}
          selectedSchedule={schedule}
        />
      ));
    }
  };

  const renderSchedules = () => {
    if (filterData.length > 0) {
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
                  <p onClick={() => handleOpenDeleteModal(schedule)} className="text-gray100">
                    {schedule.user?.name || schedule.team?.name}
                  </p>
                  <p className="text-gray50">{schedule.title}</p>
                </>
              ) : (
                <>
                  <p onClick={() => handleOpenDeleteModal(schedule)} className="text-gray100">
                    {schedule.team?.name}
                  </p>
                  <p className="text-gray50">{schedule.title}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ));
    }
  };

  const renderViewMoreButton = () => {
    const filteredSchedulesLength = filterData.length;

    const handleViewMoreClick = () => {
      setShowAllSchedules(true);

      openModal;
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
        </>
      );
    }
  };
  const handleModalDateClick = (clickedDate: Date) => {
    const formattedDate = clickedDate
      .toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-'); // YY-MM-DD 형식으로 변환

    // 부모 컴포넌트로 날짜를 전달
    if (onModalDateClick) {
      onModalDateClick(formattedDate);
    }
    console.log('Clicked date:', formattedDate);
  };

  const renderModalDate = () => {
    const clickedDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), day.getDate());
    return (
      <div onClick={() => handleModalDateClick(clickedDate)}>
        <p className={modalCell}>{` ${day.getDate()} `}</p>
      </div>
    );
  }; //밖으로빼기

  const outSiedClick = (e: MouseEvent) => {
    const { target } = e;
    if (isModalOpen && ModalRef.current && !ModalRef.current.contains(target as Node)) {
      setIsModalOpen(false);
      setShowAllSchedules(false);
    }
  };

  return (
    <div>
      {mode === 'month' && (
        <div
          ref={ModalRef}
          onClick={outSiedClick}
          className={`${Container} 'last: relative' rounded-bl-[2.4rem]`}
        >
          <div className={clsx(DateDay)}>
            {`${day.getDate()} `}
            {renderViewMoreButton()}
            {renderSchedules()}
          </div>
          <div>
            {showAllSchedules && (
              <AddScheudleModal onClose={closeModal} onClick={closeModal} content={filterData} />
            )}
          </div>
        </div>
      )}
      {mode === 'modal' && <div>{renderModalDate()}</div>}
    </div>
  );
}

export default AllDay;
