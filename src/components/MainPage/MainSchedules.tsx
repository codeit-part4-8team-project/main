import { useEffect } from 'react';
import { useContext } from 'react';
import DateBox from '@/components/SchedulesPage/DateBox';
import { Schedule } from '@/contexts/CalenarProvider';
import { calendarContext } from '@/contexts/CalenarProvider';
import { useAxios } from '@/hooks/useAxios';

interface MainSchedulesProps {
  calendarType: '나' | '팀';
  teamId?: string;
}

function MainSchedules({ calendarType, teamId }: MainSchedulesProps) {
  const { setSchedules, nowDate } = useContext(calendarContext);
  const localDate = nowDate.toISOString().substring(0, 10);
  const Container = {
    width: '100%',
    marginTop: '1.6rem',
    borderRadius: '2.4rem',
  };

  const {
    loading,
    error,
    data: responseData,
    fetchData,
  } = useAxios<{
    userSchedules: Schedule[];
    teamSchedules: Schedule[];
  }>({
    path:
      calendarType === '나'
        ? `/schedule/user/week?showUser=true&localDate=${localDate}`
        : `/schedule/team/week/${teamId}?localDate=${localDate}`,
    method: 'GET',
  });
  useEffect(() => {
    if (!loading && !error && responseData) {
      const combinedSchedules: Schedule[] = [
        ...responseData.userSchedules.map((schedule) => ({ ...schedule })),
        ...responseData.teamSchedules?.map((schedule) => ({ ...schedule })),
      ];

      const standardizedData = combinedSchedules.map((item: Schedule) => ({
        ...item,
        startDateTime: convertToISODate(item.startDateTime),
        endDateTime: convertToISODate(item.endDateTime),
      }));

      setSchedules(standardizedData);
    }
  }, [loading, error, responseData, setSchedules]);
  const convertToISODate = (dateTimeString: string): string => {
    const [date, time] = dateTimeString.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="ml-0.3 mr-5.2 mt-0.3 bg-gray-200">
        <div className="content flex justify-between gap-12 whitespace-nowrap">
          {/* <ControlDate mode="week" /> */}
        </div>

        <div style={Container}>
          <div>
            <DateBox mode="week" calendarType={calendarType} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSchedules;
