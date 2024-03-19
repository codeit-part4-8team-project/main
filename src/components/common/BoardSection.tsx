import { ReactNode } from 'react';
import CalendarIcon from '../../../public/assets/calendar-dark.svg';

interface BoardSection {
  title: string;
  content: ReactNode;
}

export default function BoardSection({ title, content }: BoardSection) {
  return (
    <div className="flex h-full flex-col gap-[1.6rem]">
      <div className="text-body1-regular font-rammetto text-gray100 flex items-center gap-[0.9rem] tracking-[-0.036rem]">
        <img src={CalendarIcon} alt="캘린더 아이콘" />
        <span>{title}</span>
      </div>
      <div className="h-full">{content}</div>
    </div>
  );
}
