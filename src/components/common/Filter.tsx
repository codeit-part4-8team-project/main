import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';
import CheckCircleIcon from '@/assets/CheckCircleFill';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface FilterItemProps {
  team: Team;
  checkedTeamId: number[];
  setCheckedTeamId: (checked: number[]) => void;
}

export default function Filter() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [checkedTeamId, setCheckedTeamId] = useState<number[]>([]);

  const { loading, error, data } = useAxios<Team[]>(
    {
      path: '/team/',
      method: 'GET',
    },
    true,
  );
  useEffect(() => {
    if (data && !loading) {
      setTeams(data);
    }
    if (error) {
      throw Error('내가 속한 팀을 불러올 수 없습니다.');
    }
  }, [data, loading, error]);
  return (
    <div className="flex flex-col gap-12">
      <span className="text-body3-bold text-gray50">그룹 필터</span>
      <ul className="flex flex-col gap-[1.3rem]">
        {teams.map((team) => {
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
  // isChecked,
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
