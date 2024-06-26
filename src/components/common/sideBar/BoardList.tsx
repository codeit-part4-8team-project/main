import { PAGES, UserPageType } from '@/constants/Page';
import { ReactElement, cloneElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useUserContext } from '@/contexts/UserProvider';

interface BoardItemProps {
  board: UserPageType;
  pathname: string;
}

export default function BoardList() {
  const { pathname } = useLocation();

  const boards = Object.keys(PAGES.user) as UserPageType[];
  boards.pop(); // 마이페이지는 제외하기 위한 코드

  return (
    <ul className="absolute left-[2.4rem] top-40 flex flex-col gap-[1.6rem]">
      {boards.map((board, idx) => (
        <li key={idx}>
          <BoardItem board={board} pathname={pathname} />
        </li>
      ))}
    </ul>
  );
}

function BoardItem({ board, pathname }: BoardItemProps) {
  const { title: boardName, icon } = PAGES.user[board as UserPageType];
  const { user } = useUserContext();
  const link = `/user/${user?.id}/${board}`;
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
