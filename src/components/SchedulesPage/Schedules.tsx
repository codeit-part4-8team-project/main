import { useContext, useState } from 'react';
import { set } from 'react-hook-form';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import TextButton from '../common/TextButton';
import DateBox from './DateBox';
import GroupFilter from './GroupFilter';
import { calendarContext } from '@/contexts/CalenarProvider';
import { Schedule } from '@/contexts/CalenarProvider';
import { useModal } from '@/contexts/ModalProvider';
import { useAxios } from '@/hooks/useAxios';
import useScheduleData from '@/hooks/useScheduleData';

interface SchedulesProps {
  calendarType: '나' | '팀';
  teamId?: string;
}

function Schedules({ calendarType, teamId }: SchedulesProps) {
  const { setSchedules, setFilteredSchedules, mode, nowDate } = useContext(calendarContext);
  const { data: userData, fetchData: userFetchData } = useAxios({});
  const { data: teamData, fetchData: teamFetchData } = useAxios({});
  const [groupData, setGroupData] = useState<Schedule[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]); // 추가
  const container = ' bg-gray10 mb-[2.4rem] mr-[2.4rem] pr-[26.9rem] rounded-[2.4rem]';
  const TeamMonthStyle = 'ml-[26.9rem]';
  const title = clsx('flex items-center');
  const openModal = useModal();

  const handleCheck = (checkedItems: Schedule[]) => {
    setFilteredSchedules(checkedItems);
  };
  const handleAddSchedule = (newSchedule: Schedule) => {
    const updatedScheduleData = [...scheduleData, newSchedule];
    setScheduleData(updatedScheduleData);
    setGroupData(updatedScheduleData);

    setFilteredSchedules(updatedScheduleData);
  };
  const handleOpenModal = () => {
    if (calendarType === '나') {
      openModal(({ close }) => (
        <ScheduleModal
          userFetchData={userFetchData}
          onAddSchedule={handleAddSchedule}
          user={true}
          closeClick={close}
          scheduleData={scheduleData}
        />
      ));
    } else {
      openModal(({ close }) => (
        <ScheduleModal
          teamFetchData={teamFetchData}
          onAddSchedule={handleAddSchedule}
          team={true}
          closeClick={close}
          teamId={teamId}
          scheduleData={scheduleData}
        />
      ));
    }
  };

  useScheduleData({
    calendarType,
    teamId,
    nowDate,
    setSchedules,
    setFilteredSchedules,
    onUpdateData: (schedule: Schedule[]) => {
      setGroupData([...schedule]);
      setScheduleData([...schedule]);
    },
  });

  return (
    <div className={container}>
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}></div>

        <TextButton onClick={handleOpenModal} buttonSize="sm" color="black">
          일정생성
        </TextButton>
      </div>
      <div
        className={clsx(
          'mr-[0.1rem] mt-[1.7rem] flex gap-12',
          calendarType === '팀' && mode === 'month' && TeamMonthStyle,
        )}
      >
        {calendarType === '나' && (
          <GroupFilter className="w-[16.5rem]" items={groupData} onCheck={handleCheck} />
        )}
        <DateBox calendarType={calendarType} mode="month" userData={userData} teamData={teamData} />
      </div>
    </div>
  );
}

export default Schedules;
