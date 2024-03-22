import { useState } from 'react';
import FilterCheckIconDark from '@/assets/FilterCheckIconDark';
import FilterCheckIconLight from '@/assets/FilterCheckIconLight';

interface ChecklistItemProps {
  isChecked: boolean;
  title: string;
  color?: string;
  onCheck: (title: string, isChecked: boolean) => void;
}

function ChecklistItem({ title, color, isChecked, onCheck }: ChecklistItemProps) {
  const nameStyle = 'text-body4-bold ml-4 text-[#292929]';
  return (
    <div className="mr-[7.4rem] flex w-[17.3rem] items-center justify-between">
      <div className="flex">
        {color ? (
          <div className={` h-4 w-4 rounded-full`} style={{ backgroundColor: color }}></div>
        ) : (
          <div className={` h-4 w-4 rounded-full`} style={{ backgroundColor: 'black' }}></div>
        )}
        <span className={nameStyle}>{title}</span>
      </div>
      <div onClick={() => onCheck(title, !isChecked)}>
        {isChecked ? <FilterCheckIconDark /> : <FilterCheckIconLight />}
      </div>
    </div>
  );
}

export interface Item {
  title: string;
  color?: string;
}

interface GroupFilterProps {
  items: Item[];
  onCheck: (checkedItem: string[]) => void;
  className?: string;
}

function GroupFilter({ items, onCheck, className }: GroupFilterProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (title: string, isChecked: boolean) => {
    const updatedCheckedItems = isChecked
      ? [...checkedItems, title]
      : checkedItems.filter((item) => item !== title);
    setCheckedItems(updatedCheckedItems);
    onCheck(updatedCheckedItems);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-14 text-body3-bold text-[#A1A1A1]">그룹 필터</div>
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
