import { useEffect, useState } from 'react';
import { Schedule } from '@/contexts/CalenarProvider';

interface AddScheduleModalProps {
  className: string;
  onClick: () => void;
  content: Schedule[];
}

export default function AddScheduleModal({ className, onClick, content }: AddScheduleModalProps) {
  return (
    <div onClick={onClick} className={className}>
      <div className="z-50  w-60  bg-white px-[1rem]  py-[0.4rem] shadow-xl">
        <div className="relative">
          <div className="flex flex-col gap-[1.5rem]">
            {content.map((schedule, index) => (
              <div key={index} className="schedule-item">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: schedule.team?.color || 'black' }}
                ></div>
                <div className="schedule-details">
                  <p className="text-gray100">{schedule.user?.name || schedule.team?.name}</p>
                  <p className="text-gray50">{schedule.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
