import { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import TextButton from '../common/TextButton';
import DateBox from './DateBox';
import { Item } from './GroupFilter';
import GroupFilter from './GroupFilter';
import { calendarContext } from '@/contexts/CalenarProvider';
import { defaultInstance } from '@/hooks/useAxios';

interface SchedulesProps {
  calendarType: '나의 캘린더' | '팀 캘린더';
}
function Schedules({ calendarType }: SchedulesProps) {
  const { schedules, setSchedules, setFilteredSchedules } = useContext(calendarContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [groupData, setGroupData] = useState<Item[]>([]);

  const container = 'w-[161.2rem] bg-gray10 mb-[2.4rem] mr-[2.4rem] pr-[26.9rem] rounded-[2.4rem]';

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

  useEffect(() => {
    // calendarType가 '나의 캘린더'인 경우에만 데이터를 가져옴
    if (calendarType === '나의 캘린더') {
      const fetchData = async () => {
        try {
          const endpoint = `http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/schedule/user/month?showUser=true&localDate=2023-03-20`;
          const response = await defaultInstance.get(endpoint);
          setSchedules(response.data.userSchedulesResponse);
          setGroupData(response.data.userSchedulesResponse);
        } catch (error) {
          console.error('Error fetching group filter data:', error);
        }
      };

      fetchData();
    }
  }, [calendarType]);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        let endpoint = '';
        if (calendarType === '나의 캘린더') {
          endpoint = `http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/schedule/user/month?showUser=true&localDate=2023-03-20`;
        } else if (calendarType === '팀 캘린더') {
          endpoint = `http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/schedule/team/month/5?localDate=2024-03-07`; // 변경된 부분: 팀 캘린더용 엔드포인트로 변경
        }

        const response = await defaultInstance.get(endpoint);
        if (calendarType === '팀 캘린더') {
          setSchedules(response.data); // 변경된 부분
          setFilteredSchedules(response.data.teamSchedules);
        }
      } catch (error) {
        console.error('Error fetching group filter data:', error);
      }
    };

    fetchSchedule();
  }, [calendarType]);

  const handleCheck = (checkedItems: Item[]) => {
    // 체크된 아이템들을 기반으로 스케줄 필터링 수행
    const checkedItemTitles = checkedItems.map((item) => item.title);
    const filteredSchedules =
      schedules?.filter((schedule) => checkedItemTitles.includes(schedule.title)) ?? [];
    setFilteredSchedules(filteredSchedules);
  };

  return (
    <div className={container}>
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}></div>

        <TextButton buttonSize="sm" color="black">
          일정생성
        </TextButton>
        {isModalOpen && <ScheduleModal />}
      </div>
      <div className="mr-[0.1rem] mt-[1.7rem] flex gap-12">
        {calendarType === '나의 캘린더' && (
          <GroupFilter className="w-[16.5rem]" items={groupData} onCheck={handleCheck} />
        )}
        <DateBox mode="month" />
      </div>
    </div>
  );
}

export default Schedules;
