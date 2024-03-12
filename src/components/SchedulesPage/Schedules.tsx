import { useRef, useState } from 'react';
import clsx from 'clsx';
import MyCalendar from '../../../public/assets/My calendar.svg';
import CalendarImg from '../../../public/assets/calendar-dark.svg';
import ScheduleModal from '../Modal/ScheduleModal';
import Button from '../common/Button';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import GruoupFilter from './GroupFilter';

interface SchedulesProps {
  calendarType: string;
}

function Schedules({ calendarType }: SchedulesProps) {
  const container =
    'w-full h-full pb-[2.4rem] pt-[2.6rem] pr-[31.4rem] pl-[3rem]  bg-[#F7F7F7]  rounded-[2.4rem] mb-[4.1rem]';

  const title = clsx('flex item-center ');
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  let calendarsType = calendarType === '나의 캘린더' ? MyCalendar : '';
  return (
    <div className={container}>
      <div className={clsx('ju m-0 flex items-center  gap-[78.8rem] p-0 ')}>
        <div className={title}>
          <img className="mr-4" src={CalendarImg} alt="달력 이미지" />
          <img className="mr-[2.4rem]" src={calendarsType} />
          <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
        </div>

        <Button submit={openModal} text="일정생성" />
        {isModalOpen && <ScheduleModal />}
      </div>
      <div className="mr-[0.1rem] mt-[3.9rem] flex gap-12">
        <GruoupFilter />
        <DateBox nowDate={nowDate} setNowDate={setNowDate} />
      </div>
    </div>
  );
}

export default Schedules;
