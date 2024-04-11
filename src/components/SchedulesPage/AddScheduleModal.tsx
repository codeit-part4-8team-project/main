import { Schedule } from '@/contexts/CalenarProvider';

interface AddScheduleModalProps {
  className: string;
  onClick: () => void;
  content: Schedule[];
}

export default function AddScheduleModal({ className, content, onClick }: AddScheduleModalProps) {
  return (
    <div
      className={`z-60 fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <div className="rounded-lg bg-white p-4 shadow-xl">
        <div className="relative">
          <div className="flex flex-col gap-4">
            {content.map((schedule, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: schedule.team?.color || 'black' }}
                ></div>
                <div>
                  <p className="text-gray-800">{schedule.user?.name || schedule.team?.name}</p>
                  <p className="text-gray-500">{schedule.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
