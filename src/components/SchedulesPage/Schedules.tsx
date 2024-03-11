import { useRef, useState } from 'react';
import fileterIcon from '../../../public/images/filter.svg';
import ScheduleModal from '../Modal/ScheduleModal';
import Button from '../common/Button';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import clsx from 'clsx';

interface SchedulesProps {
  calendarType: string;
}

function Schedules({ calendarType }: SchedulesProps) {
  const Container = 'w-full flex flex-col items-center h-full p-[2.4rem]';
  const Contents = clsx('pt-[2.3rem] pl-12 pr-[3.2rem] pb-[2.2rem]');
  const Text = clsx('text-[#111] font-normal text-[1.6rem]');
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date>();
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

  return (
    <div className={Container}>
      <div className={Contents}>
        <div className={clsx('ju m-0 flex items-center justify-between gap-[122.8rem] p-0')}>
          <div className={Text}>{calendarType} 캘린더</div>
          <div className={clsx(`flex items-center ${Text}`)}>
            {calendarType !== '팀  || 스터디' && (
              <>
                그룹필터
                <img
                  src={fileterIcon}
                  alt="필터 아이콘"
                  className={clsx('ml-4 mr-8 h-[2.4rem] w-[2.4rem] bg-[#D9D9D9]')}
                />
              </>
            )}
            <Button submit={openModal} text="일정생성" />
            {isModalOpen && <ScheduleModal />}
          </div>
        </div>
        <div className={clsx('pl-[2.1rem] pr-4')}>
          <ControlDate nowDate={nowDate} setNowDate={setNowDate} />

          <DateBox
            nowDate={nowDate}
            setNowDate={setNowDate}
            clickedDate={clickedDate}
            setClickedDate={setClickedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Schedules;
