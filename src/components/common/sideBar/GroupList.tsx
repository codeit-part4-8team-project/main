import { userTeamsInfo } from '@/mockdata/teamData';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from '@/components/common/sideBar/DropDown';
import ColorChipIcon from '@/assets/ColorChipIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

interface GroupItemProps {
  color: string;
  children: ReactNode;
}

export default function GroupList() {
  return (
    <ul className="absolute left-[2.4rem] top-[7.4rem] flex flex-col gap-[1.6rem]">
      {userTeamsInfo.map(({ name, color }) => {
        return (
          <li>
            <GroupItem color={color}>{name}</GroupItem>
          </li>
        );
      })}
    </ul>
  );
}

function GroupItem({ color, children }: GroupItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Link to="/teams/1">
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
