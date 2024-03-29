import { PAGES, Page, TeamPageType } from '@/constants/constants';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import DividerIcon from '@/assets/DividerIcon';

export default function TabsList() {
  const { pageContent } = useParams();
  const teamPageList = Object.keys(PAGES.team) as TeamPageType[];

  return (
    <ul className="flex items-center gap-[2.4rem]">
      {teamPageList.map((page, idx) => {
        const { title } = PAGES.team[page] as Page;
        const isCurrent = page === pageContent ? true : false;
        return (
          <li key={idx} className="flex items-center gap-[2.4rem]">
            {idx !== 0 && <DividerIcon />}
            <Link
              to={page}
              className={clsx(
                isCurrent ? 'text-body3-bold text-gray100' : 'text-body3-medium text-gray50',
              )}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
