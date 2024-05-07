import { MouseEvent } from 'react';
import { Schedule } from '@/contexts/CalenarProvider';

interface AddScheduleModalProps {
  onClick: () => void;
  content: Schedule[];
  onClose: () => void;
}

export default function AddScheduleModal({ content, onClick, onClose }: AddScheduleModalProps) {
  const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center  bg-[#FCFCFC]`}
      onClick={handleCloseModal}
    >
      <div
        className=" relative  z-[60]  h-[15.4rem] w-60 overflow-y-auto  rounded-lg py-[0.4rem] shadow-xl"
        onClick={handleModalClick}
      >
        <div className="flex flex-col gap-4">
          <span className="close absolute right-2 top-2 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          {content.map((schedule, index) => (
            <div key={index} className="flex flex-col items-center  gap-2">
              <div className="flex gap-2">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: schedule.team?.color || 'black' }}
                ></div>

                <p className="text-gray-800  text-body4-bold">
                  {schedule.user?.name || schedule.team?.name}
                </p>
              </div>

              <div className=" text-body3-regular text-gray50">{schedule.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
