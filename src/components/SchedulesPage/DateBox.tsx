import { useContext, useEffect, useState } from 'react';
import { makeWeekArr } from '../MainPage/WeekArr';
import { WeekDisplay } from '../MainPage/WeekDisplay';
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
  const weeksStyle = ' text-center text-[#FFF] text-body3-bold bg-[#292929] p-4 ';

  const monthList = (nowDate: Date) => {
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();

    const firstDayOfMonth = new Date(nowYear, nowMonth, 1);
    const lastDayOfMonth = new Date(nowYear, nowMonth + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 현재 달의 첫째 날의 요일

    // 6주(42일)를 표시하기 위해 필요한 날짜 개수 계산
    const totalDaysToShow = 42;

    const result = Array.from({ length: totalDaysToShow }, (_, i) => {
      if (i < firstDayOfWeek) {
        // 이전 달의 날짜
        return new Date(nowYear, nowMonth, 0 - (firstDayOfWeek - i - 1));
      } else if (i < firstDayOfWeek + lastDayOfMonth.getDate()) {
        // 현재 달의 날짜
        return new Date(nowYear, nowMonth, i - firstDayOfWeek + 1);
      } else {
        // 다음 달의 날짜
        return new Date(nowYear, nowMonth + 1, i - (firstDayOfWeek + lastDayOfMonth.getDate()) + 1);
      }
    });
    return result;
  };

  const updateDateList = () => {
    if (mode === 'month') {
      setAllDay(monthList(nowDate));
    } else if (mode === 'week') {
      const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
      const weekArray = makeWeekArr(currentDate);
      setWeek(weekArray);
    }
  };

  // 초기 렌더링 시 한 번 호출
  useEffect(() => {
    updateDateList();
  }, [updateDateList]);

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      {mode === 'month' && (
        <div className="grid h-full w-full grid-cols-7 rounded-[2.4rem] ">
          {days.map((day: string, index: number) => {
            return (
              <div
                key={index}
                className={`${weeksStyle} ${index === 0 ? 'rounded-tl-[2.4rem] bg-[#F74242]' : ''} ${index === 6 ? 'rounded-tr-[2.4rem]' : ''} `}
              >
                <WeekBox weekName={day} />
              </div>
            );
          })}

          {allDay.map((day: Date) => (
            <AllDay key={day.getTime()} day={day} />
          ))}
        </div>
      )}
      {mode === 'week' && (
        <div className="grid h-[29.1rem] w-full grid-cols-7 rounded-[2.4rem]  bg-[#FCFCFC] shadow-sm  ">
          <WeekDisplay week={week} />
        </div>
      )}
    </>
  );
}

export default DateBox;
