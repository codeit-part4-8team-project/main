import { ReactNode } from 'react';
import ControlDate from '../SchedulesPage/ControlDate';
import CalendarIcon from '@/assets/CalendarIcon';
import FolderIcon from '@/assets/FolderIcon';
import MegaphoneIcon from '@/assets/MegaphoneIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface BoardSection {
  title: keyof typeof ICON;
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

export default function BoardSection({ title, content, children }: BoardSection) {
  const shouldDisplayControlDate = title === 'My calendar' || title === 'Team calendar';
  const controlDateMargin = title === 'My calendar' ? 'mr-[6.8rem]' : 'ml-[6.8rem] ';
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="flex items-center gap-[0.9rem] whitespace-nowrap text-body1-regular tracking-[-0.036rem] text-gray100">
        {ICON[title]}
        <span className={`font-rammetto ${controlDateMargin}`}>{title}</span>
        {shouldDisplayControlDate && (
          <ControlDate className={`text-body4-bold text-gray100`} mode="month" />
        )}
      </div>
      <div className="flex-auto">{content || children}</div>
      {/* content안에 단일 컴포넌트로 넣기 불편한 페이지가 있어서 chilren으로 받을 수 있도록 했습니다.*/}
    </div>
  );
}
