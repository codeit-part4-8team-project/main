import clsx from 'clsx';

interface Props {
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}
function ControlDate({ nowDate, setNowDate }: Props) {
  const Container = clsx('w-full', 'flex', 'flex-start', 'items-center');
  const Button = clsx(
    'w-[1.6rem]',
    'h-[1.6rem]',
    'text-[#11111]',
    'border-[0.1rem]',
    'border-solid',
    'border-slate-300',
  );
  const DateText = `font-bold text-[1.2rem] text-[#292929] font-pretendard w-[15.4rem] h-[1.4rem]`;

  const getWeekRange = (date: Date): [Date, Date] => {
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - diff - 1);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    return [startDate, endDate];
  };

  const changeMonth = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setMonth(date.getMonth() + change);
    setNowDate(date);
  };
  const changeWeekCalendar = (change: number) => {
    const today = new Date(nowDate.getTime());
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    today.setDate(today.getDate() - diff + 7 * change);
    setNowDate(today);
  };
  const [startDate, endDate] = getWeekRange(nowDate);
  return (
    <div className={Container}>
      <button className={Button} onClick={() => changeMonth(-1)}>{`<<`}</button>
      <button className={Button} onClick={() => changeWeekCalendar(-1)}>{`<`}</button>

      <h1
        className={DateText}
      >{`${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate()} ~ ${endDate.getFullYear()}.${endDate.getMonth() + 1}. ${endDate.getDate()}`}</h1>
      <button className={Button} onClick={() => changeWeekCalendar(1)}>{`>`}</button>
      <button className={Button} onClick={() => changeMonth(1)}>{`>>`}</button>
    </div>
  );
}
export default ControlDate;
