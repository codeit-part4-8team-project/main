import { useRef, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import Button from '../common/Button';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import GruoupFilter from './GroupFilter';
import CalendarIcon from '@/assets/CalendarIcon';

interface SchedulesProps {
  calendarType: string;
}

function Schedules({ calendarType }: SchedulesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const container =
    'w-[161.2rem] bg-[#F7F7F7] mt-[8.6rem] ml-[28.4rem] mb-[2.4rem]  mr-[2.4rem] pb-[3rem] pt-12 pl-12 pr-[26.9rem] rounded-[2.4rem]';

  const title = clsx('flex items-center ');

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
  let calendarsType = calendarType === '나의 캘린더' ? 'My Calendar' : 'Team Calendar ';

  return (
    <div className={container}>
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}>
          <CalendarIcon active={true} className="mr-4 h-[3.6rem] w-[3.6rem]"></CalendarIcon>
          <span className="mr-[2.4rem] whitespace-nowrap font-rammetto text-body1-medium">
            {calendarsType}
          </span>
          <ControlDate mode="month" />
        </div>

        <Button submit={openModal} text="일정생성" />
        {isModalOpen && <ScheduleModal />}
      </div>
      <div className="mr-[0.1rem] mt-[3.9rem] flex gap-12">
        <GruoupFilter />
        <DateBox mode="month" />
      </div>
    </div>
  );
}

export default Schedules;
