import { useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';

function Schedules() {
  const Container = 'w-full flex flex-col  items-center';
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date>();
  return (
    <div className={Container}>
      <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
      <DateBox
        nowDate={nowDate}
        setNowDate={setNowDate}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
      />
    </div>
  );
}
export default Schedules;
