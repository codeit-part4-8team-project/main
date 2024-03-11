import { ReactNode } from 'react';
import CalendarIcon from '../../../public/assets/calendar-dark.svg';

interface BoardSection {
  title: string;
  children: ReactNode;
}

export default function BoardSection({ title, children }: BoardSection) {
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="font-rammetto flex items-center gap-[0.9rem] text-[1.8rem] tracking-[-0.036rem] text-[#292929]">
        <img src={CalendarIcon} alt="캘린더 아이콘" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
