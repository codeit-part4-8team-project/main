// interface Props{
//   day: Date;
//   nowDate:Date;
//   setNowDate:React.Dispatch<React.SetStateAction<Date>>;
//   clickedDate:Date|undefined;
//   setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
// }
// function AllDay({day,nowDate,setNowDate,clickedDate,setClickedDate}:Props){
//     const Container ="w-full flex justify-center items-center";
//     //const nowTime = new Date();
//     //const sameMonth = nowDate.getMonth()=== day.getMonth();
//     // const sameDay = nowTime.getFullYear() === day.getFullYear() &&
//     // nowTime.getMonth()=== day.getMonth()&&
//     // nowTime.getDate()=== day.getDate();
//     // const clickDay:boolean = clickedDate //undefined일 수 있기 때문
//     // ?clickedDate.getFullYear()===day.getFullYear()
//     // && clickedDate.getMonth() === day.getMonth() &&
//     // clickedDate.getDate() === day.getDate(): false;
//     const clickDate = ()=>{
//       setClickedDate(day);
//     }
//   return<div  className={Container}onClick={clickDate}
//  //  sameMonth={sameMonth} sameDay={sameDay} clickDay ={clickDay}
//   ><p>{day.getDate()} </p></div>;
// }
// export default AllDay;
import clsx from 'clsx';

interface Props {
  day: Date;
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  clickedDate: Date | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function AllDay({ day, nowDate, setNowDate, clickedDate, setClickedDate }: Props) {
  const Container = clsx('w-full flex justify-center items-center ');
  const DateDay = clsx('text-black text-[1.2rem] font-bold w-[22rem] h-[15rem] text-center', {
    'bg-[#EDEDED]':
      day.getDay() === 0 || day.getDay() === 2 || day.getDay() === 4 || day.getDay() === 6, // 월, 수, 금
    'bg-[#FFF]': day.getDay() === 1 || day.getDay() === 3 || day.getDay() === 5, // 화, 목, 토
  });
  const clickDate = () => {
    setClickedDate(day);
  };

  const getWeekDay = (dayIndex: number): string => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekDays[dayIndex];
  };

  return (
    <div className={Container} onClick={clickDate}>
      <div>
        <p className={DateDay}>{`${day.getDate()}(${getWeekDay(day.getDay())})`}</p>
      </div>
    </div>
  );
}

export default AllDay;
