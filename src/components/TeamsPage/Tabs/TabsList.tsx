import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { TEAM_PAGES } from '@/components/TeamsPage/Tabs/constants';
import { useTeam } from '@/contexts/TeamProvider';
import DividerIcon from '@/assets/DividerIcon';

export default function TabsList() {
  const { currentPage } = useTeam();

  return (
    <div className="flex items-center gap-[2.4rem]">
      {TEAM_PAGES.map(({ page, title }, idx) => {
        const isCurrent = page === currentPage ? true : false;
        return (
          <>
            {idx !== 0 && <DividerIcon />}
            <Link
              to={page}
              className={clsx(
                isCurrent ? 'stext-gray100 text-body3-bold' : 'text-body3-medium text-gray50',
              )}
            >
              {title}
            </Link>
          </>
        );
      })}
    </div>
  );
}
