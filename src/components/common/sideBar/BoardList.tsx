import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { BOARDS, Boards } from '@/components/common/SideBar/constants';

interface BoardItemProps {
  boardType: string;
  pathname: string;
}

export default function BoardList() {
  const { pathname } = useLocation();

  return (
    <ul className="absolute left-[2.4rem] top-40 flex flex-col gap-[1.6rem]">
      <li>
        <BoardItem boardType="dashboard" pathname={pathname} />
      </li>
      <li>
        <BoardItem boardType="calendar" pathname={pathname} />
      </li>
      <li>
        <BoardItem boardType="kanbanboard" pathname={pathname} />
      </li>
      <li>
        <BoardItem boardType="board" pathname={pathname} />
      </li>
    </ul>
  );
}

function BoardItem({ boardType, pathname }: BoardItemProps) {
  const { boardName, iconOn, iconOff, link } = BOARDS[boardType as keyof Boards];
  const isCurrent = pathname === link ? true : false;

  return (
    <Link to={link}>
      <button
        className={clsx(
          'flex h-16 w-[21.2rem] items-center gap-[1.6rem] rounded-[0.6rem] px-[1.6rem] py-[0.8rem] hover:bg-[#EDEEDC]/10',
          isCurrent && 'bg-[#EDEEDC]/10',
        )}
      >
        <img
          className={clsx(!isCurrent && 'opacity-10')}
          src={isCurrent ? iconOn : iconOff}
          alt={`${boardName} 아이콘`}
        />
        <span className="text-body3-regular text-[#EDEEDC] opacity-100">{boardName}</span>
      </button>
    </Link>
  );
}
