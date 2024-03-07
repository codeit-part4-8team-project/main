import clsx from 'clsx';
interface Props{
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}
function ControlDate ({nowDate, setNowDate}:Props){
   const Container = clsx('w-full','flex', 'flex-start', 'items-center');
   const Button= clsx('w-[1.6rem]','h-[1.6rem]','text-[#11111]','border-[0.1rem]','border-solid','border-slate-300');
  const DateText =clsx('font-bold','text-xl');

  const changeYear=(change:number)=>{
    const date = new Date(nowDate.getTime());
    date.setFullYear(date.getFullYear()+change);
    setNowDate(date);
  };
const changeMonth=(change:number)=>{
  const date = new Date(nowDate.getTime());
  date.setMonth(date.getMonth()+ change);
  setNowDate(date);
};

  return(
<div className={Container}>
  
   <button  className={Button} onClick={()=>changeYear(-1)}>{`<<`}</button>
   <button className={Button} onClick={()=>changeMonth(-1)}>{`<`}</button>
  
   <h1 className={DateText}>{`${nowDate.getFullYear()}년 ${nowDate.getMonth()+1}월`}</h1>

   <button className={Button} onClick={()=>changeMonth(1)}>{`>`}</button>
   <button className={Button} onClick={()=>changeYear(1)}>{`>>`}</button>
   
 
    </div>
  );
  
}
export default ControlDate;