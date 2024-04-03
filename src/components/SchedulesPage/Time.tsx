import React, { useState } from 'react';
import TextButton from '../common/TextButton';
import AllowDownIcon from '@/assets/AllowDownIcon';

interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

function NavItem({ icon, children }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setOpen(false); // Close dropdown after selection
  };
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="nav-item-container relative">
      <div className="flex h-[3.2rem] w-24 items-center rounded-[0.6rem] border-[0.1rem] border-gray30 py-[1.2rem] pl-4">
        <div className="nav-item-content " onClick={toggleOpen}>
          {selectedItem}
        </div>
        {open && (
          <div className="  absolute left-0 right-0 top-[3.2rem] z-50 bg-white">
            <div className="max-h-[5rem] overflow-y-auto">
              {childrenArray?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item as string)}
                  className={`max-h-[5rem] cursor-pointer overflow-y-auto ${
                    selectedItem ===
                    (typeof item === 'object' ? ((item as any)?.props?.children as string) : '')
                      ? 'bg-gray300'
                      : ''
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="icon-button" onClick={toggleOpen}>
          {icon}
        </button>
      </div>
    </div>
  );
}

export default NavItem;

export function Time() {
  const times = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes: number[] = Array.from({ length: 60 }, (_, index) => index);

  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const handleComplete = () => {
    let hour = selectedHour;
    if (selectedPeriod === 'PM') {
      hour += 12;
    }
    const formattedTime = `${hour}:${formatTime(selectedMinute)} :00`;
    console.log('Selected Time:', formattedTime);
    // 여기서 선택된 시간 값을 다른 곳으로 전달하거나 사용할 수 있습니다.
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-[0.2rem] mt-6 text-body5-bold text-gray100">시간</p>
      <div className="flex items-center  gap-[0.9rem]">
        <NavItem icon={<AllowDownIcon />}>
          <p
            className={`text-center text-body5-bold text-gray100 hover:bg-gray30 ${
              selectedPeriod === 'AM' ? 'bg-gray300' : ''
            }`}
            onClick={() => setSelectedPeriod('AM')}
          >
            AM
          </p>
          <p
            className={`text-center text-body5-bold text-gray100 hover:bg-gray30 ${
              selectedPeriod === 'PM' ? 'bg-gray300' : ''
            }`}
            onClick={() => setSelectedPeriod('PM')}
          >
            PM
          </p>
        </NavItem>
        <NavItem icon={<AllowDownIcon />}>
          {times.map((number) => (
            <p
              className={`text-center text-body5-bold text-gray100 hover:bg-gray30 ${
                selectedHour === number ? 'bg-gray300' : ''
              }`}
              key={number}
              onClick={() => setSelectedHour(number)}
            >
              {formatTime(number)}
            </p>
          ))}
        </NavItem>
        <div className="text-body5-bold text-gray100">:</div>
        <NavItem icon={<AllowDownIcon />}>
          {minutes.map((number) => (
            <p
              className={`text-center text-body5-bold text-gray100 hover:bg-gray30 ${
                selectedMinute === number ? 'bg-gray300' : ''
              }`}
              key={number}
              onClick={() => setSelectedMinute(number)}
            >
              {formatTime(number)}
            </p>
          ))}
        </NavItem>
      </div>
      <TextButton
        buttonSize="md"
        color="black"
        className="mt-[4.9rem] h-[3.2rem] w-[20.7rem] text-body5-bold text-gray100"
        onClick={handleComplete}
      >
        완료
      </TextButton>
    </div>
  );
}

export function formatTime(time: number) {
  return time < 10 ? `0${time}` : `${time}`;
}
