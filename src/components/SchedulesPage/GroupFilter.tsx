import { useState } from 'react';
import FilterCheckIconDark from '@/assets/FilterCheckIconDark';
import FilterCheckIconLight from '@/assets/FilterCheckIconLight';

interface ChecklistItemProps {
  isChecked: boolean;
  item: Item; // 수정된 부분
  onCheck: (title: string, isChecked: boolean) => void;
}

function ChecklistItem({ item, isChecked, onCheck }: ChecklistItemProps) {
  const { title, teamResponse } = item; // 수정된 부분
  const nameStyle = 'text-body4-bold ml-4 text-[#292929]';
  const color = teamResponse ? teamResponse.color : ''; // 수정된 부분
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
  id: number;
  title: string;
  content: string;
  startDateTime: string;
  endDateTime: string;
  author?: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
    username: string;
    createdDate: string;
  };
  teamResponse?: {
    id: number;
    name: string;
    description: string;
    color: string;
  };
}
interface GroupFilterProps {
  items: Item[];
  onCheck: (checkedItems: Item[]) => void;
  className?: string;
}

function GroupFilter({ items, onCheck, className }: GroupFilterProps) {
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);

  const handleCheck = (title: string, isChecked: boolean) => {
    const updatedCheckedItems = isChecked
      ? [...checkedItems, items.find((item) => item.title === title)!]
      : checkedItems.filter((item) => item.title !== title);
    setCheckedItems(updatedCheckedItems as Item[]);
    onCheck(updatedCheckedItems as Item[]);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-14 text-body3-bold text-[#A1A1A1]">그룹 필터</div>
      {items &&
        items.map((item, index) => (
          <ChecklistItem
            key={index}
            item={item} // 수정된 부분
            isChecked={checkedItems.some(
              (checkedItem) => checkedItem.title === item.title, // 수정된 부분
            )}
            onCheck={(title: string, isChecked: boolean) => handleCheck(title, isChecked)}
          />
        ))}
    </div>
  );
}

export default GroupFilter;
