import { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import MyCalendar from '../../../public/assets/My calendar.svg';
import CalendarImg from '../../../public/assets/calendar-dark.svg';
import ScheduleModal from '../Modal/ScheduleModal';
import Button from '../common/Button';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import GruoupFilter from './GroupFilter';
import axios from 'axios';
import { calendarContext } from '@/contexts/CalenarProvider';

// const requestData = {
//   url: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
//   serviceKey: process.env.REACT_APP_SERVICE_KEY,
// };

interface SchedulesProps {
  calendarType: string;
}

function Schedules({ calendarType }: SchedulesProps) {
  const { nowDate } = useContext(calendarContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  // const [holiday, setHoliday] = useState('');

  // const getHoliday = async () => {
  //   const bodyData = {
  //     ...requestData,
  //     solYear: nowDate.getFullYear(),
  //     solMonth: nowDate.getMonth() + 1,
  //   };
  //   const response = await axios.get(
  //     `${bodyData.url}?ServiceKey=${bodyData.serviceKey}&solYear=${bodyData.solYear}&solMonth=${bodyData.solMonth}`,
  //   );
  //   console.log(response.data.response.body.items);
  // };

  // useEffect(() => {
  //   getHoliday();
  // }, [nowDate]);

  const container =
    'w-[161.2rem] bg-[#F7F7F7] mt-[8.6rem] ml-[28.4rem] mb-[2.4rem]  mr-[2.4rem] pb-[3rem] pt-12 pl-12 pr-[26.9rem] rounded-[2.4rem]';

  const title = clsx('flex item-center');

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
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}>
          <img className="mr-4" src={CalendarImg} alt="달력 이미지" />
          <img className="mr-[2.4rem]" src={calendarsType} />
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
