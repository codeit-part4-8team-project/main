import { ReactNode } from 'react';
import CalendarIcon from '../../../public/assets/calendar-dark.svg';

interface BoardSection {
  title: string;
  content: ReactNode;
}

export default function BoardSection({ title, content }: BoardSection) {
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="flex items-center gap-[0.9rem] font-rammetto text-[1.8rem] tracking-[-0.036rem] text-gray100">
        <img src={CalendarIcon} alt="캘린더 아이콘" />
        <span>{title}</span>
      </div>
      <div className="h-full">{content}</div>
    </div>
  );
}
