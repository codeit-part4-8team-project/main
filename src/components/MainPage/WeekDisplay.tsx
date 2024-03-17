interface WeekDisplayProps {
  week: Array<[number, Date]>;
}

export const WeekDisplay: React.FC<WeekDisplayProps> = ({ week }) => {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const getDayOfWeek = (date: Date): string => {
    return days[date.getDay()];
  };
  return (
    <>
      {week.map(([index, date]) => (
        <div
          className={` text-center text-[1.4rem] font-bold ${index === 6 ? 'border-none' : 'border-r border-solid border-[#E5E5E5]'}
           ${date.toDateString() === today.toDateString() ? 'text-[#292929]' : 'text-[#A1A1A1]'}`}
          key={index}
        >
          {`  ${date.getMonth() + 1}.${date.getDate()}. (${getDayOfWeek(date)})`}
        </div>
      ))}
    </>
  );
};
