import ControlDate from '../../SchedulesPage/ControlDate';
import DateBox from '../../SchedulesPage/DateBox';

function ModalCalendar() {
  return (
    <div className="h-full w-full">
      <ControlDate mode="modal" />
      <DateBox mode="modal" />
    </div>
  );
}

export default ModalCalendar;
