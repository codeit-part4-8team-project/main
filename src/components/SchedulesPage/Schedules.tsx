import { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import TextButton from '../common/TextButton';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import { Item } from './GroupFilter';
import GroupFilter from './GroupFilter';
import { calendarContext } from '@/contexts/CalenarProvider';
import { defaultInstance } from '@/hooks/useAxios';
import CalendarIcon from '@/assets/CalendarIcon';

interface SchedulesProps {
  calendarType: string;
}
export interface SchedulesData {
  title: string;
  content: string;
  startDateTime: string;
  endDateTime: string;
  date: Date;
}

function Schedules({ calendarType }: SchedulesProps) {
  const { schedules, setSchedules, setFilteredSchedules } = useContext(calendarContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [groupData, setGroupData] = useState<Item[]>([]);

  const container =
    'w-[161.2rem] bg-gray10 mt-[8.6rem] ml-[28.4rem] mb-[2.4rem]  mr-[2.4rem] pb-[3rem] pt-12 pl-12 pr-[26.9rem] rounded-[2.4rem]';

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
          endpoint = `http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/schedule/user/month/5?localDateTime=2024-03-20%2011%3A11%3A11`;
        } else {
          endpoint = '/public/data/GroupFilterTeam.json';
        }

        if (groupData.length === 0) {
          const response = await defaultInstance.get(endpoint);
          setGroupData(response.data);
        }
      } catch (error) {
        console.error('Error fetching group filter data:', error);
      }
    };

    fetchData();
  }, [calendarType]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        let endpoint = '';
        if (calendarType === '나의 캘린더') {
          endpoint =
            'http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/schedule/user/month/5?localDateTime=2024-03-20%2011%3A11%3A11';
        } else {
          endpoint = '/public/data/TeamSchedule.json';
        }

        if (!schedules || schedules.length === 0) {
          const response = await defaultInstance.get(endpoint);
          setSchedules(response.data);
        }
      } catch (error) {
        console.error('Error fetching group filter data:', error);
      }
    };

    fetchSchedule();
  }, [calendarType]); // schedules 상태 추가

  const handleCheck = (checkedItems: string[]) => {
    setFilteredSchedules(
      schedules ? schedules.filter((schedule) => checkedItems.includes(schedule.title)) : [],
    );
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

        <TextButton buttonSize="sm" color="black">
          일정생성
        </TextButton>
        {isModalOpen && <ScheduleModal />}
      </div>
      <div className="mr-[0.1rem] mt-[3.9rem] flex gap-12">
        <GroupFilter items={groupData} onCheck={handleCheck} />
        <DateBox mode="month" />
      </div>
    </div>
  );
}

export default Schedules;
