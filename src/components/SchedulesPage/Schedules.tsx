import { useContext, useState } from 'react';
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
    // 새로운 일정을 추가하는 로직을 수행한 후 필요한 처리를 합니다.
    // 예를 들어, scheduleData 상태를 업데이트하고 필터링된 일정 목록을 설정할 수 있습니다.
    const updatedScheduleData = [...scheduleData, newSchedule];
    setScheduleData(updatedScheduleData);

    // 필요한 처리가 끝나면 필터링된 일정 목록을 다시 설정합니다.
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
  // const handleOpenProfile = () => {
  //   openModal(({ close }) => <ProfileModal closeClick={close} />);
  // };

  //나머지 코드는 동일하게 유지됩니다.

  //리로드 함수 정의
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

  // useEffect(() => {
  //   useScheduleData({
  //     calendarType,
  //     teamId,
  //     nowDate,
  //     setSchedules,
  //     setFilteredSchedules,
  //     onUpdateData: (schedule: Schedule[]) => {
  //       setGroupData([...schedule]);
  //       setScheduleData([...schedule]);
  //     },
  //   });
  // }, []); // 빈 배열을 넘겨 처음 렌더링될 때 한 번만 호출되도록 설정

  return (
    <div className={container}>
      <div className="m-0 flex items-center justify-between p-0 ">
        <div className={title}></div>

        <TextButton
          onClick={handleOpenModal}
          //onClick={handleOpenProfile}
          buttonSize="sm"
          color="black"
        >
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
