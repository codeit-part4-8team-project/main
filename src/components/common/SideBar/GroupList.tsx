import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import GreenDot from '../../../../public/assets/green-dot.svg';
import KebabIcon from '../../../../public/assets/kebab-light.svg';
import DropDown from './DropDown';

interface GroupItemProps {
  children: ReactNode;
}

function GroupItem({ children }: GroupItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Link to="/teams/1">
      <button className="grid h-16 w-[21.2rem] grid-cols-[2.4rem_1fr_2.4rem] gap-[1.6rem] rounded-[0.6rem] py-[0.8rem] pl-[1.6rem]">
        <img src={GreenDot} alt={`초록색 점`} />
        <span className="text-[1.4rem] font-bold text-[#EDEEDC]">{children}</span>
        <button onClick={handleOptionClick} className="relative justify-self-end">
          <img src={KebabIcon} alt={`옵션 아이콘`} />
          {isOpen && <DropDown />}
        </button>
      </button>
    </Link>
  );
}

export default function GroupList() {
  return (
    <ul className="absolute left-[2.4rem] top-[7.4rem] flex flex-col gap-[1.6rem]">
      <li>
        <GroupItem>코드잇 프로젝트</GroupItem>
      </li>
      <li>
        <GroupItem>디자인 스터디</GroupItem>
      </li>
      <li>
        <GroupItem>토익 공부 모임</GroupItem>
      </li>
    </ul>
  );
}
