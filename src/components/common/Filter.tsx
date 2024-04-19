import { useState } from 'react';
import clsx from 'clsx';
import { Team } from '@/types/teamTypes';
import CheckCircleIcon from '@/assets/CheckCircleFill';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface FilterProps {
  myTeams: Team[];
  checkedTeamId: number[];
  setCheckedTeamId: (checked: number[]) => void;
  className?: string;
}

interface FilterItemProps {
  team: Team;
  checkedTeamId: number[];
  setCheckedTeamId: (checked: number[]) => void;
}

export default function Filter({
  myTeams,
  checkedTeamId,
  setCheckedTeamId,
  className,
}: FilterProps) {
  return (
    <div className={clsx('flex flex-col gap-12', className)}>
      <span className="text-body3-bold text-gray50">그룹 필터</span>
      <ul className="flex flex-col gap-[1.3rem]">
        {myTeams.map((team) => {
          return (
            <FilterItem
              key={team.id}
              team={team}
              checkedTeamId={checkedTeamId}
              setCheckedTeamId={setCheckedTeamId}
            />
          );
        })}
      </ul>
    </div>
  );
}

function FilterItem({
  team: { id, name, color },
  checkedTeamId,
  setCheckedTeamId,
}: FilterItemProps) {
  const [isChecked, setIsChecked] = useState(checkedTeamId.includes(id));

  const handleCheckClick = () => {
    if (!isChecked) {
      setCheckedTeamId([...checkedTeamId, id]);
    } else {
      const deleted = checkedTeamId.filter((checkedId) => checkedId !== id);
      setCheckedTeamId([...deleted]);
    }
    setIsChecked(!isChecked);
  };

  sessionStorage.setItem('filteredTeam', JSON.stringify(checkedTeamId));

  return (
    <li key={id} className="flex w-[16.2rem] items-center justify-between gap-4">
      <ColorChipIcon fill={color} />
      <span className="grow justify-self-start text-body4-bold">{name}</span>
      <button type="button" onClick={handleCheckClick}>
        <CheckCircleIcon active={isChecked} />
      </button>
    </li>
  );
}
