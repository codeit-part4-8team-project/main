import { ReactElement, cloneElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { BOARDS, Boards } from '@/components/common/sideBar/constants';
import { useUserContext } from '@/contexts/UserProvider';

interface BoardItemProps {
  board: string;
  pathname: string;
}

export default function BoardList() {
  const { pathname } = useLocation();

  const boards = Object.keys(BOARDS);

  return (
    <ul className="absolute left-[2.4rem] top-40 flex flex-col gap-[1.6rem]">
      {boards.map((board) => (
        <li>
          <BoardItem board={board} pathname={pathname} />
        </li>
      ))}
    </ul>
  );
}

function BoardItem({ board, pathname }: BoardItemProps) {
  const { boardName, icon } = BOARDS[board as keyof Boards];
  const { user } = useUserContext();
  const link = board === 'main' ? `/user/${board}` : `/user/${board}/${user?.id}`;
  const isCurrent = pathname === link ? true : false;

  const boardItemIcon = icon as ReactElement;

  return (
    <Link to={link}>
      <button
        className={clsx(
          'flex h-16 w-[21.2rem] items-center gap-[1.6rem] rounded-[0.6rem] px-[1.6rem] py-[0.8rem] hover:bg-[#EDEEDC]/10',
          isCurrent && 'bg-[#EDEEDC]/10',
        )}
      >
        {icon &&
          cloneElement(boardItemIcon, {
            ...boardItemIcon.props,
            active: isCurrent,
            fill: 'white',
            className: clsx(isCurrent || 'opacity-10'),
          })}
        <span className="text-body3-regular text-[#EDEEDC] opacity-100">{boardName}</span>
      </button>
    </Link>
  );
}
