import { ReactNode } from 'react';
import CalendarIcon from '@/assets/CalendarIcon';
import ViewListIcon from '@/assets/ViewListIcon';

interface BoardSection {
  title: string;
  content: ReactNode;
}

export default function BoardSection({ title, content }: BoardSection) {
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="flex items-center gap-[0.9rem] font-rammetto text-body1-regular tracking-[-0.036rem] text-gray100">
        {/* <CalendarIcon fill="#292929" active /> */} {/* TODO 상황에 맞는 아이콘 */}
        <ViewListIcon fill="#292929" active />
        <span>{title}</span>
      </div>
      <div className="h-full overflow-auto">{content}</div>
    </div>
  );
}
