import { useEffect, useState } from 'react';

function DateBox({ nowDate }: { nowDate: Date }) {
  const [week, setWeek] = useState<Array<[number, Date]>>([]);

  useEffect(() => {
    const makeWeekArr = (date: Date): Array<[number, Date]> => {
      const day = date.getDay();
      const week: Array<[number, Date]> = [];
      for (let i = 0; i < 7; i++) {
        const newDate = new Date(date.valueOf() + 86400000 * (i - day));
        week.push([i, newDate]);
      }
      return week;
    };

    const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
    const weekArr = makeWeekArr(currentDate);
    setWeek(weekArr);
  }, [nowDate]);

  const getDayOfWeek = (date: Date): string => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const WeekDisplay: React.FC<{ week: Array<[number, Date]> }> = ({ week }) => (
    <>
      {week.map(([index, date]) => (
        <div
          className="border-r border-solid border-[#E5E5E5] text-center text-[1.4rem] font-bold text-[#A1A1A1] "
          key={index}
        >
          {`  ${date.getMonth() + 1}.${date.getDate()}.`} ({getDayOfWeek(date)})
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="grid h-[40.6rem] grid-cols-7 gap-2 rounded-[2.4rem]  ">
        <WeekDisplay week={week} />
      </div>
    </>
  );
}

export default DateBox;
