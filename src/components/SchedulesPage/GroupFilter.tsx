import { useState } from 'react';
import { Schedule } from '@/contexts/CalenarProvider';
import FilterCheckIconDark from '@/assets/FilterCheckIconDark';
import FilterCheckIconLight from '@/assets/FilterCheckIconLight';

interface ChecklistItemProps {
  isChecked: boolean;
  item: Schedule;
  onCheck: (id: number, isChecked: boolean) => void; // 수정된 부분
}

function ChecklistItem({ item, isChecked, onCheck }: ChecklistItemProps) {
  const nameStyle = 'text-body4-bold ml-4 text-[#292929]';
  const color = item.team ? item.team.color : 'black';
  const handleToggleCheck = () => {
    onCheck(item.id, !isChecked); // 수정된 부분
  };
  return (
    <div className="mr-[7.4rem] flex w-[17.3rem] items-center justify-between">
      <div className="flex">
        <div className={` h-4 w-4 rounded-full`} style={{ backgroundColor: color }}></div>

        <span className={nameStyle}>{item.title}</span>
      </div>
      <div onClick={handleToggleCheck}>
        {isChecked ? <FilterCheckIconDark /> : <FilterCheckIconLight />}
      </div>
    </div>
  );
}

interface GroupFilterProps {
  items: Schedule[];
  onCheck: (checkedItems: Schedule[]) => void; // 변경 전: (checkedItems: Schedule[]) => void;
  className?: string;
}

function GroupFilter({ items, onCheck, className }: GroupFilterProps) {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const handleCheck = (id: number, isChecked: boolean) => {
    const updatedCheckedIds = isChecked
      ? [...checkedIds, id]
      : checkedIds.filter((checkedId) => checkedId !== id);
    const updatedCheckedItems = items.filter((item) => updatedCheckedIds.includes(item.id));
    setCheckedIds(updatedCheckedIds);
    onCheck(updatedCheckedItems); // 수정된 부분: onCheck(updatedCheckedItems);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-14 text-body3-bold text-[#A1A1A1]">그룹 필터</div>
      {items.length > 0 &&
        items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            isChecked={checkedIds.includes(item.id)}
            onCheck={(id: number, isChecked: boolean) => handleCheck(id, isChecked)}
          />
        ))}
    </div>
  );
}

export default GroupFilter;
