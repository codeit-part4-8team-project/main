import { Link } from 'react-router-dom';
import { BOARDS, Boards } from './constants';
import clsx from 'clsx';

interface BoardItemProps {
  boardType: string;
  isCurrent?: boolean;
}

function BoardItem({ boardType, isCurrent }: BoardItemProps) {
  const { boardName, iconOn, iconOff, link } = BOARDS[boardType as keyof Boards];
  return (
    <Link to={link}>
      <button
        className={clsx(
          'flex h-16 w-[21.2rem] items-center gap-[1.6rem] rounded-[0.6rem] px-[1.6rem] py-[0.8rem] hover:bg-[#EDEEDC]/10',
          isCurrent && 'bg-[#EDEEDC]/10',
        )}
      >
        <img src={isCurrent ? iconOn : iconOff} alt={`${boardName} 아이콘`} />
        <span className="text-[1.4rem] text-[#EDEEDC] opacity-100">{boardName}</span>
      </button>
    </Link>
  );
}

export default function BoardList() {
  // TODO isCurrent는 context에서 관리할 수 있겠다
  return (
    <ul className="absolute left-[2.4rem] top-40 flex flex-col gap-[1.6rem]">
      <li>
        <BoardItem boardType="dashboard" isCurrent />
      </li>
      <li>
        <BoardItem boardType="calendar" />
      </li>
      <li>
        <BoardItem boardType="kanbanboard" />
      </li>
    </ul>
  );
}
