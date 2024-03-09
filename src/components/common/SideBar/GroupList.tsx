import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import GreenDot from '../../../../public/assets/green-dot.svg';
import clsx from 'clsx';

interface GroupItemProps {
  children: ReactNode;
}

function GroupItem({ children }: GroupItemProps) {
  return (
    <Link to="/teams/1">
      <button
        className={clsx(
          'flex h-16 w-[21.2rem] items-center gap-[1.6rem] rounded-[0.6rem] px-[1.6rem] py-[0.8rem]',
        )}
      >
        <img src={GreenDot} alt={`초록색 점`} />
        <span className={clsx('text-[1.4rem] font-bold text-[#EDEEDC]')}>{children}</span>
      </button>
    </Link>
  );
}

export default function GroupList() {
  return (
    <ul className={clsx('absolute left-[2.4rem] top-[7.4rem] flex flex-col gap-[1.6rem]')}>
      <GroupItem>코드잇 프로젝트</GroupItem>
      <GroupItem>디자인 스터디</GroupItem>
      <GroupItem>토익 공부 모임</GroupItem>
    </ul>
  );
}
