import { useState } from 'react';
import { Team } from '@/types/teamTypes';
import CheckCircleIcon from '@/assets/CheckCircleFill';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface FilterProps {
  teamList: Team[];
  checkedTeamId: number[];
  setCheckedTeamId: (checked: number[]) => void;
}

interface FilterItemProps {
  team: Team;
  checkedTeamId: number[];
  setCheckedTeamId: (checked: number[]) => void;
}

export default function Filter({ teamList, checkedTeamId, setCheckedTeamId }: FilterProps) {
  if (checkedTeamId.length === 0) {
    const myTeamsId = teamList.map((team) => team.id);
    setCheckedTeamId(myTeamsId);
  }

  return (
    <div className="flex flex-col gap-12">
      <span className="text-body3-bold text-gray50">그룹 필터</span>
      <ul className="flex flex-col gap-[1.3rem]">
        {teamList.map((team) => {
          return (
            <FilterItem
              key={team.id}
              team={team}
              checkedTeamId={checkedTeamId}
              setCheckedTeamId={setCheckedTeamId}
            ></FilterItem>
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
    <li key={id} className="flex w-[19rem] items-center justify-between gap-4">
      <ColorChipIcon fill={color} />
      <span className="grow justify-self-start text-body4-bold">{name}</span>
      <button type="button" onClick={handleCheckClick}>
        <CheckCircleIcon active={isChecked} />
      </button>
    </li>
  );
}
