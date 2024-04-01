import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import ControlDate from '../SchedulesPage/ControlDate';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import MegaphoneIcon from '@/assets/MegaphoneIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface BoardSection {
  title: keyof typeof ICON;
  mode?: 'month' | 'week';
  content?: ReactNode;
  children?: ReactNode;
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

export default function BoardSection({ title, content, mode, children }: BoardSection) {
  const { pageContent } = useParams();
  const controlDateMode = mode === 'week' ? 'week' : 'month';
  const shouldDisplayControlDate = title === 'My calendar' || title === 'Team calendar';
  const gapBetweenTitleAndContent = clsx({
    'gap-[1.6rem]': pageContent === ('main' || 'issue'),
    'gap-12': pageContent === 'schedule',
    'gap-[6.4rem]': pageContent === 'announcement',
    'gap-[2.8rem]': pageContent === 'member',
  });

  return (
    <div className={clsx('flex h-full flex-col gap-[1.6rem]', gapBetweenTitleAndContent)}>
      <div
        className={clsx(
          'relative flex w-full items-center gap-16 whitespace-nowrap text-body1-regular tracking-[-0.036rem] text-gray100',
          title === 'My calendar' && 'justify-between',
        )}
      >
        <div className="flex gap-4">
          {ICON[title]}
          <span className="font-rammetto">{title}</span>
        </div>
        {shouldDisplayControlDate && (
          <ControlDate className={`text-body4-bold text-gray100`} mode={controlDateMode} />
        )}
      </div>
      <div className="flex-auto">{content || children}</div>
    </div>
  );
}
