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
}

function GroupFilter({ items, onCheck }: GroupFilterProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (title: string, isChecked: boolean) => {
    const updatedCheckedItems = isChecked
      ? [...checkedItems, title]
      : checkedItems.filter((item) => item !== title);
    setCheckedItems(updatedCheckedItems);
    onCheck(updatedCheckedItems);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-14 text-body3-bold text-[#A1A1A1]">그룹 필터</div>
        {items.map((data, index) => (
          <ChecklistItem
            key={index}
            title={data.title}
            color={data.color}
            isChecked={checkedItems.includes(data.title)}
            onCheck={handleCheck}
          />
        ))}
      </div>
    </>
  );
}

export default GroupFilter;
