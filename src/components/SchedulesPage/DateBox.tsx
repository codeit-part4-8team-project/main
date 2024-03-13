import React, { useContext, useEffect, useState } from 'react';
import AllDay from './AllDay';
import WeekBox from './WeekBox';
import { calendarContext } from '@/contexts/CalenarProvider';

interface DateBoxProp {
  mode: 'month' | 'week';
}
function DateBox({ mode }: DateBoxProp) {
  const [week, setWeek] = useState<Array<[number, Date]>>([]);
  const [allDay, setAllDay] = useState<Date[]>([]);
  const { nowDate } = useContext(calendarContext);

  useEffect(() => {
    if (mode === 'month') {
      setAllDay(monthList(nowDate));
    } else if (mode === 'week') {
      const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
      const weekArr = makeWeekArr(currentDate);
      setWeek(weekArr);
    }
  }, [nowDate, mode]);

  const makeWeekArr = (date: Date): Array<[number, Date]> => {
    const day = date.getDay();
    const week: Array<[number, Date]> = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    return week;
  };

  const monthList = (nowDate: Date) => {
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();

    const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
    const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

    const result: Date[] = [];
    const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();
    const nowMonthed = new Date(nowYear, nowMonth + 1, 0).getDate();
    for (let i = dayOneWeek - 1; i >= 0; i--) {
      result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
    }
    for (let i = 1; i <= nowMonthed; i++) {
      result.push(new Date(nowYear, nowMonth, i));
    }
    for (let i = 1; i < 7 - dayLastWeek; i++) {
      result.push(new Date(nowYear, nowMonth + 1, i));
    }
    return result;
  };

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
  const weeks = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weeksStyle = ' text-center text-[#FFF] font-bold text-[1.4rem] bg-[#292929] p-4 ';

  return (
    <>
      {mode === 'month' && (
        <div className=" shadow-[ 0_0_1rem_0_rgba(17, 17,  17, 0.05)] grid h-[40.6rem] grid-cols-7 rounded-[2.4rem] ">
          {weeks.map((week: string, index: number) => {
            return (
              <div
                key={index}
                className={`${weeksStyle} ${index === 0 ? 'rounded-tl-[2.4rem] bg-[#F74242]' : ''} ${index === 6 ? 'rounded-tr-[2.4rem]' : ''} `}
              >
                <WeekBox weekName={week} />
              </div>
            );
          })}

          {allDay.map((day: Date) => (
            <AllDay key={day.getTime()} day={day} />
          ))}
        </div>
      )}
      {mode === 'week' && (
        <div className="grid h-[40.6rem] grid-cols-7 gap-2 rounded-[2.4rem]  ">
          <WeekDisplay week={week} />
        </div>
      )}
    </>
  );
}

export default DateBox;
