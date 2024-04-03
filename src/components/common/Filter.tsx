import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';
import CheckCircleIcon from '@/assets/CheckCircleFill';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface FilterItemProps {
  team: Team;
  isChecked: boolean;
}

export default function Filter() {
  const [teams, setTeams] = useState<Team[] | []>([]);

  const { loading, error, data } = useAxios<Team[] | []>(
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
          return <FilterItem team={team} isChecked={true}></FilterItem>;
        })}
      </ul>
    </div>
  );
}

function FilterItem({ team: { id, name, color }, isChecked }: FilterItemProps) {
  return (
    <li key={id} className="flex w-[19rem] items-center justify-between gap-4">
      <ColorChipIcon fill={color} />
      <span className="grow justify-self-start text-body4-bold">{name}</span>
      <CheckCircleIcon active={isChecked} />
    </li>
  );
}
