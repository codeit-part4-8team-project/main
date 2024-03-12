import clsx from 'clsx';
import ArrowLeftAll from '../../../public/assets/_allow-left-all.svg';
import ArrowLeft from '../../../public/assets/_allow-left.svg';
import ArrrowRightAll from '../../../public/assets/_allow-right-all.svg';
import ArrowRight from '../../../public/assets/_allow-right.svg';

interface Props {
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}
function ControlDate({ nowDate, setNowDate }: Props) {
  const Container = clsx('w-full', 'flex', 'items-center');
  const arrowButton = 'w-[2.4rem] h-[2.4rem]';
  const DateText = clsx('font-bold text-[1.2rem] text-[#292929] mx-[1.6rem]');

  const changeYear = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setFullYear(date.getFullYear() + change);
    setNowDate(date);
  };
  const changeMonth = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setMonth(date.getMonth() + change);
    setNowDate(date);
  };

  return (
    <div className={Container}>
      <button className={`${arrowButton} mr-[0.4rem]`} onClick={() => changeYear(-1)}>
        <img src={ArrowLeftAll} alt="이전 년도 이동 아이콘" />
      </button>
      <button className={arrowButton} onClick={() => changeMonth(-1)}>
        <img src={ArrowLeft} alt="이전 달 이동 아이콘" />
      </button>

      <h1 className={DateText}>{`${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`}</h1>

      <button className={arrowButton} onClick={() => changeMonth(1)}>
        <img src={ArrowRight} alt="다음 달 이동 아이콘" />
      </button>
      <button className={`${arrowButton}mr-[0.4rem]`} onClick={() => changeYear(1)}>
        <img src={ArrrowRightAll} alt="다음 년도 이동 아이콘" />
      </button>
    </div>
  );
}
export default ControlDate;
