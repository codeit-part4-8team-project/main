import ControlDate from '../../SchedulesPage/ControlDate';
import DateBox from '../../SchedulesPage/DateBox';

interface ModalCalendarProps {
  onModalDateClick?: (date: string) => void;
}
function ModalCalendar({ onModalDateClick }: ModalCalendarProps) {
  return (
    <div className="h-full w-full">
      <ControlDate mode="modal" />
      <DateBox onModalDateClick={onModalDateClick} mode="modal" />
    </div>
  );
}

export default ModalCalendar;
