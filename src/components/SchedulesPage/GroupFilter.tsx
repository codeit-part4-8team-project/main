import { useState } from 'react';
import BaseProfile from '../../../public/assets/ProfileIcon.svg';
import CheckOn from '../../../public/assets/check-circle-fill-dark.svg';
import CheckOff from '../../../public/assets/check-circle-fill.svg';

interface ChecklistItemProps {
  isChecked: boolean;
  name: string;
  color: string;
  onCheck: () => void;
}

function ChecklistItem({ name, color, isChecked, onCheck }: ChecklistItemProps) {
  return (
    <div className="flex w-[17.3rem] items-center justify-between">
      <div className="flex">
        {color ? (
          <div className={`mr-1 h-4 w-4 rounded-full`} style={{ backgroundColor: color }}></div>
        ) : (
          <img className="h-4 w-4" src={BaseProfile} alt="기본 프로필" />
        )}
        <span className="ml-4">{name}</span>
      </div>
      <img onClick={onCheck} src={isChecked ? CheckOn : CheckOff} alt="체크리스트" />
    </div>
  );
}
function GroupFilter() {
  const items = [
    { name: '홍길동', color: '' },
    { name: '디자인 스터디', color: 'yellow' },
    { name: '코드잇 프로젝트', color: 'blue' },
    { name: '토익 공부 모임', color: 'red' },
  ];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(items.length).fill(false));

  const handleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="text-[1.4rem] font-bold text-[#A1A1A1]">그룹 필터</div>
      {items.map((item, index) => (
        <ChecklistItem
          key={index}
          name={item.name}
          color={item.color}
          isChecked={checkedItems[index]}
          onCheck={() => handleCheck(index)}
        />
      ))}
    </div>
  );
}

export default GroupFilter;
