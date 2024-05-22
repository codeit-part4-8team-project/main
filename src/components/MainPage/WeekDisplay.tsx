import { useContext } from 'react';
import { calendarContext } from '@/contexts/CalenarProvider';

interface WeekDisplayProps {
  week: Array<[number, Date]>;
  calendarType?: '나' | '팀';
}

export const WeekDisplay: React.FC<WeekDisplayProps> = ({ week, calendarType }) => {
  const { schedules } = useContext(calendarContext);
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  // 주어진 날짜의 요일을 반환하는 함수
  const getDayOfWeek = (date: Date): string => {
    return days[date.getDay()];
  };

  return (
    <>
      {week.map(([index, date]) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // endOfDay.setDate(endOfDay.getDate());

        const dailySchedules =
          schedules &&
          schedules.filter((item) => {
            const itemStartDate = new Date(item.startDateTime);
            const itemEndDate = new Date(item.endDateTime);
            return itemStartDate <= endOfDay && itemEndDate >= startOfDay;
          });

        return (
          <div
            className={`text-center text-body3-bold ${index === 6 ? 'border-none' : 'border-r border-solid border-gray30'}
            ${date.toDateString() === today.toDateString() ? 'text-gray100' : 'text-gray50'}`}
            key={index}
          >
            <div className="mb-[4.5rem]">{`  ${date.getMonth() + 1}.${date.getDate()}. (${getDayOfWeek(date)})`}</div>
            {dailySchedules?.map((item) => (
              <div key={item.id}>
                <div className="flex justify-center ">
                  <div
                    className="mr-4 h-6 w-6 rounded-full"
                    style={{
                      backgroundColor: item.team?.color || 'black',
                    }}
                  ></div>
                  <div>
                    {calendarType === '나' ? (
                      <>
                        <p className="text-gray100">{item.user?.name || item.team?.name}</p>
                        <p>{item.title}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray100">{item.team?.name}</p>
                        <p>{item.title}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default WeekDisplay;
