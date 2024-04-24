import { useEffect } from 'react';
import { Schedule } from '@/contexts/CalenarProvider';
import { useAxios } from '@/hooks/useAxios';

interface UseScheduleDataProps {
  calendarType?: '나' | '팀';
  teamId?: string;
  nowDate?: Date;
  setSchedules?: (schedules: Schedule[]) => void;
  setFilteredSchedules?: (filteredSchedules: Schedule[]) => void;
  onUpdateData?: (data: Schedule[]) => void;
}

function useScheduleData({
  calendarType,
  teamId,
  nowDate,
  setSchedules,
  setFilteredSchedules,
  onUpdateData,
}: UseScheduleDataProps) {
  const localDate = nowDate?.toISOString().substring(0, 10);

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
      setSchedules && setSchedules([...data.userSchedules, ...data.teamSchedules]);
      setFilteredSchedules && setFilteredSchedules([...data.userSchedules, ...data.teamSchedules]);
      onUpdateData && onUpdateData([...data.userSchedules, ...data.teamSchedules]);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [calendarType, teamId, nowDate]);
  return data;
}

export default useScheduleData;
