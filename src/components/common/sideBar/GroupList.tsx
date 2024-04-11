import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Team } from '@/types/teamTypes';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface GroupListProps {
  myTeams: Team[];
}

interface GroupItemProps {
  color: string;
  teamId: number;
  isCurrent: boolean;
  children: ReactNode;
}

export default function GroupList({ myTeams }: GroupListProps) {
  const { teamId } = useParams();

  return (
    <ul className="absolute left-[2.4rem] top-[7.4rem] flex flex-col gap-[1.6rem]">
      {myTeams.map(({ id, name, color }) => {
        const isCurrent = teamId ? Number(teamId) === id : false;

        return (
          <li key={id}>
            <GroupItem color={color} teamId={id} isCurrent={isCurrent}>
              {name}
            </GroupItem>
          </li>
        );
      })}
    </ul>
  );
}

function GroupItem({ color, teamId, isCurrent, children }: GroupItemProps) {
  return (
    <Link to={`/team/${teamId}/main`}>
      <div
        className={clsx(
          'grid h-16 w-[21.2rem] grid-cols-[2.4rem_1fr_2.4rem] items-center gap-[1.6rem] rounded-[0.6rem] py-[0.8rem] pl-[1.6rem] hover:bg-[#EDEEDC]/10',
          isCurrent && 'bg-[#EDEEDC]/10',
        )}
      >
        <ColorChipIcon fill={color} />
        <span className="justify-self-start text-body3-bold text-[#EDEEDC]">{children}</span>
      </div>
    </Link>
  );
}
