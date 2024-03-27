import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from '@/components/common/sideBar/DropDown';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';
import ColorChipIcon from '@/assets/ColorChipIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

interface GroupItemProps {
  color: string;
  teamId: number;
  children: ReactNode;
}

export default function GroupList() {
  const [teams, setTeams] = useState<Team[]>([]);

  const { loading, error, data } = useAxios<Team[]>(
    {
      path: '/team/my-team',
      method: 'GET',
    },
    true,
  );
  useEffect(() => {
    if (data && !loading) {
      setTeams(data);
    }
    if (error) {
      console.log('오류');
    }
  }, [data, loading, error]);

  return (
    <ul className="absolute left-[2.4rem] top-[7.4rem] flex flex-col gap-[1.6rem]">
      {teams.map(({ id, name, color }) => {
        return (
          <li key={id}>
            <GroupItem color={color} teamId={id}>
              {name}
            </GroupItem>
          </li>
        );
      })}
    </ul>
  );
}

function GroupItem({ color, teamId, children }: GroupItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Link to={`/team/${teamId}/main`}>
      <button className="grid h-16 w-[21.2rem] grid-cols-[2.4rem_1fr_2.4rem] items-center gap-[1.6rem] rounded-[0.6rem] py-[0.8rem] pl-[1.6rem] hover:bg-[#EDEEDC]/10">
        <ColorChipIcon fill={color} />
        <span className="justify-self-start text-body3-bold text-[#EDEEDC]">{children}</span>
        <button onClick={handleOptionClick} className="relative justify-self-end">
          <MeatbollsIcon fill="white" />
          {isOpen && <DropDown />}
        </button>
      </button>
    </Link>
  );
}
