import { useEffect, useState } from 'react';
import { SchedulesData } from '../SchedulesPage/Schedules';
import { useAxios } from '@/hooks/useAxios';

interface WeekDisplayProps {
  week: Array<[number, Date]>;
}

export const WeekDisplay: React.FC<WeekDisplayProps> = ({ week }) => {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const getDayOfWeek = (date: Date): string => {
    return days[date.getDay()];
  };
  const [schedule, setSchedule] = useState<SchedulesData[]>([]);
  const {
    loading,
    error,
    data: responseData,
    fetchData,
  } = useAxios<SchedulesData[]>({
    path: '/schedule/user/week/5?localDateTime=2024-03-22%2000%3A00%3A00',
    method: 'GET',
  });
  useEffect(() => {
    if (!loading && !error && responseData) {
      // 응답 데이터를 받아온 후 처리합니다.
      const standardizedData = responseData.map((item: SchedulesData) => ({
        ...item,
        startDateTime: convertToISODate(item.startDateTime),
        endDateTime: convertToISODate(item.endDateTime),
      }));
      setSchedule(standardizedData);
    }
  }, [loading, error, responseData]);

  useEffect(() => {
    fetchData();
  }, []);

  // 날짜 및 시간을 ISO 8601 형식으로 변환하는 함수
  const convertToISODate = (dateTimeString: string): string => {
    const [date, time] = dateTimeString.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  };

  return (
    <>
      {week.map(([index, date]) => {
        return (
          <div
            className={`text-center text-body3-bold ${index === 6 ? 'border-none' : 'border-r border-solid border-gray30'}
              ${date.toDateString() === today.toDateString() ? 'text-gray100' : 'text-gray50'}`}
            key={index}
          >
            {`  ${date.getMonth() + 1}.${date.getDate()}. (${getDayOfWeek(date)})`}
            {schedule.map((item, idx) => {
              const itemStartDate = new Date(item.startDateTime);
              const itemEndDate = new Date(item.endDateTime);
              const startOfDay = new Date(date);
              startOfDay.setHours(0, 0, 0, 0);
              if (startOfDay <= itemEndDate && itemStartDate <= date) {
                return (
                  <div key={idx}>
                    <p>{item.title}</p>
                    <p>{item.content}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </>
  );
};

export default WeekDisplay;
