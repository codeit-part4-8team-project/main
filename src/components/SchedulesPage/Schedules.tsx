import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import Button from '../common/Button';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import { Item } from './GroupFilter';
import GroupFilter from './GroupFilter';
import axios from 'axios';
import CalendarIcon from '@/assets/CalendarIcon';

interface SchedulesProps {
  calendarType: string;
  schedules?: Schedules[];
}
export interface Schedules {
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
}

function Schedules({ calendarType }: SchedulesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [groupData, setGroupData] = useState<Item[]>([]);
  const [schedules, setSchedules] = useState<Schedules[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedules[]>([]);

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

  useEffect(() => {
    // calendarType에 따라 다른 엔드포인트를 호출하여 데이터를 가져옴
    const fetchData = async () => {
      try {
        let endpoint = '';
        if (calendarType === '나의 캘린더') {
          endpoint = '/public/data/GroupFilter.json';
        } else {
          endpoint = '/public/data/GroupFilterTeam.json';
        }

        // 상태(state)가 비어 있는 경우에만 데이터를 불러옴
        if (groupData.length === 0) {
          const response = await axios.get(endpoint);
          setGroupData(response.data);
        }
      } catch (error) {
        console.error('Error fetching group filter data:', error);
      }
    };

    fetchData();
  }, [calendarType, groupData]); // groupData 상태 추가

  useEffect(() => {
    // calendarType에 따라 다른 엔드포인트를 호출하여 데이터를 가져옴
    const fetchSchedule = async () => {
      try {
        let endpoint = '';
        if (calendarType === '나의 캘린더') {
          endpoint = '/public/data/IdSchedule.json';
        } else {
          endpoint = '/public/data/TeamSchedule.json';
        }

        // 상태(state)가 비어 있는 경우에만 데이터를 불러옴
        if (schedules.length === 0) {
          const response = await axios.get(endpoint);
          setSchedules(response.data);
        }
      } catch (error) {
        console.error('Error fetching group filter data:', error);
      }
    };

    fetchSchedule();
  }, [calendarType, schedules]); // schedules 상태 추가

  const handleCheck = (checkedItems: string[]) => {
    // 그룹 필터 아이템들의 타이틀들을 전달하여 필터링된 일정을 업데이트
    setFilteredSchedules(schedules.filter((schedule) => checkedItems.includes(schedule.title)));
  };

  return (
    <div className={container}>
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}>
          <CalendarIcon active={true} className="mr-4 h-[3.6rem] w-[3.6rem]"></CalendarIcon>
          <span className="mr-[10rem] whitespace-nowrap font-rammetto text-body1-medium">
            {calendarsType}
          </span>
          <ControlDate mode="month" />
        </div>

        <Button submit={openModal} text="일정생성" />
        {isModalOpen && <ScheduleModal />}
      </div>
      <div className="mr-[0.1rem] mt-[3.9rem] flex gap-12">
        <GroupFilter items={groupData} onCheck={handleCheck} />
        <DateBox schedules={filteredSchedules} mode="month" />
      </div>
    </div>
  );
}

export default Schedules;
