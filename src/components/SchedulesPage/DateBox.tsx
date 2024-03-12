import AllDay from './AllDay';

//import WeekBox from './WeekBox';

const monthList = (nowDate: Date) => {
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();

  const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay(); //해당 연도와 월의 첫번째 요일
  const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay(); //해당 연도와 다음 월의 마지막 요일

  const result: Date[] = [];
  const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate(); //이전 달의 마지막 날짜
  const nowMonthed = new Date(nowYear, nowMonth + 1, 0).getDate(); //해당 연도와 다음 월의 마지막 날짜
  for (let i = dayOneWeek - 1; i >= 0; i--) {
    result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
  } //전 달의 마지막 날짜부터 현재 월력의 시작 요일까지의 날짜

  for (let i = 1; i <= nowMonthed; i++) {
    result.push(new Date(nowYear, nowMonth, i));
  } //현재 월에 해당하는 모든 날짜

  for (let i = 1; i < 7 - dayLastWeek; i++) {
    result.push(new Date(nowYear, nowMonth + 1, i));
  } //현재 월의 다음 달로 넘어가는 날짜
  return result;
};

interface Props {
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}
function DateBox({ nowDate, setNowDate }: Props) {
  const Container = 'w-[101.7rem] grid  grid-cols-[repeat(7,1fr)] rounded-[2.4rem]';
  const allDay: Date[] = monthList(nowDate);
  // const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className={Container}>
      {/* {weeks.map((week:string)=>
    {return <WeekBox weekName={week}/>;
    })} */}

      {allDay.map((day: Date) => {
        return <AllDay key={day.getTime()} day={day} nowDate={nowDate} setNowDate={setNowDate} />;
      })}
    </div>
  );
}
export default DateBox;
