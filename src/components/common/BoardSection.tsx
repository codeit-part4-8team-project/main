import { ReactNode } from 'react';
import ControlDate from '../SchedulesPage/ControlDate';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import MegaphoneIcon from '@/assets/MegaphoneIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface BoardSection {
  title: keyof typeof ICON;
  content: ReactNode;
  mode?: 'month' | 'week';
}

const ICON = {
  'My calendar': <CalendarIcon fill="#292929" active />,
  'Team calendar': <CalendarIcon fill="#292929" active />,
  'Kanban board': <ViewListIcon fill="#292929" active />,
  Notice: <MegaphoneIcon fill="#292929" active />,
  'Bulletin board': <FolderIcon fill="#292929" active />,
  Members: <FolderIcon fill="#292929" active />,
  콘텐츠: <FolderIcon fill="#292929" active />,
};

export default function BoardSection({ title, content, mode }: BoardSection) {
  const shouldDisplayControlDate = title === 'My calendar' || title === 'Team calendar';
  const controlDateMode = mode === 'week' ? 'week' : 'month';
  const controlDateStyle = mode === 'week' ? 'mr-[111.5rem]' : 'mr-[6.8rem]';
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="relative flex  items-center gap-[0.9rem] whitespace-nowrap text-body1-regular tracking-[-0.036rem] text-gray100">
        {ICON[title]}
        <span className={`font-rammetto ${controlDateStyle}`}>{title}</span>
        {shouldDisplayControlDate && (
          <ControlDate className={`text-body4-bold text-gray100`} mode={controlDateMode} />
        )}
      </div>
      <div className="h-full overflow-auto">{content}</div>
    </div>
  );
}
