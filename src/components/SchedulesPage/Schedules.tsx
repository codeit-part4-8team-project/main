import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import ScheduleModal from '../Modal/ScheduleModal';
import TextButton from '../common/TextButton';
import DateBox from './DateBox';
import GroupFilter from './GroupFilter';
import { Schedule, calendarContext } from '@/contexts/CalenarProvider';
import { useModal } from '@/contexts/ModalProvider';
import { useAxios } from '@/hooks/useAxios';

interface SchedulesProps {
  calendarType: '나' | '팀';
  teamId?: string;
}
function Schedules({ calendarType, teamId }: SchedulesProps) {
  const { setSchedules, setFilteredSchedules, mode, nowDate } = useContext(calendarContext);
  const [groupData, setGroupData] = useState<Schedule[]>([]);
  const container = ' bg-gray10 mb-[2.4rem] mr-[2.4rem] pr-[26.9rem] rounded-[2.4rem]';
  const TeamMonthStyle = 'ml-[26.9rem]';
  const title = clsx('flex items-center');

  const openModal = useModal();

  const localDate = nowDate.toISOString().substring(0, 10);
  const { data, fetchData } = useAxios<{
    userSchedules: Schedule[];
    teamSchedules: Schedule[];
  }>(
    {
      path:
        calendarType === '나'
          ? `/schedule/user/month?showUser=true&localDate=${localDate}`
          : `/schedule/team/month/${teamId}?localDate=${localDate}`,
    },
    true,
  );

  useEffect(() => {
    if (data) {
      setSchedules([...data.userSchedules, ...data.teamSchedules]);
      if (calendarType === '나') {
        setGroupData([...data.userSchedules, ...data.teamSchedules]);
        setFilteredSchedules([...data.userSchedules, ...data.teamSchedules]);
      } else if (calendarType === '팀') {
        setFilteredSchedules(data.teamSchedules);
        setSchedules(data.teamSchedules);
      }
      true;
    }
  }, [data, setSchedules, setFilteredSchedules, calendarType, nowDate, mode, teamId]);

  const handleCheck = (checkedItems: Schedule[]) => {
    setFilteredSchedules(checkedItems);
  };
  useEffect(() => {
    fetchData();
  }, [calendarType, teamId, mode, nowDate]);

  const handleOpenModal = () => {
    if (calendarType === '나') {
      openModal(({ close }) => <ScheduleModal user={true} closeClick={close} />);
    } else {
      openModal(({ close }) => <ScheduleModal team={true} closeClick={close} teamId={teamId} />);
    }
  };
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
        <DateBox calendarType={calendarType} mode="month" />
      </div>
    </div>
  );
}

export default Schedules;
