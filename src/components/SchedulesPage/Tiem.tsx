import React, { useState } from 'react';
import TextButton from '../common/TextButton';
import AllowDownIcon from '@/assets/AllowDownIcon';

interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode[];
  onItemSelected: (item: string) => void;
}

function NavItem({ icon, children, onItemSelected }: NavItemProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const firstChild = children[0];

  const handleItemClick = (item: string | null | undefined) => {
    console.log('Item clicked:', item);
    if (item) {
      onItemSelected(item);
      setOpen(false); // Close dropdown after selection if you want
    }
  };

  return (
    <div className="nav-item-container relative">
      <div className="flex h-[3.2rem] w-24 items-center rounded-[0.6rem] border-[0.1rem] border-gray30 py-[1.2rem] pl-4">
        {!open && <div className="nav-item-content">{firstChild}</div>}
        {open && (
          <div className="absolute left-0 right-0 top-[3.2rem] z-50 bg-white">
            {open && (
              <div className="z-50 bg-white">
                {children.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleItemClick(
                        typeof item === 'object' ? ((item as any)?.props?.children as string) : '',
                      )
                    }
                    className={`cursor-pointer ${
                      (typeof item === 'object' ? (item as any)?.props?.children : '')
                        ? 'bg-gray300'
                        : ''
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
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
  const [selectedItem, setSelectedItem] = useState('');
  const handleItemSelected = (item: string) => {
    setSelectedItem(item);
  };

  const times = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

  return (
    <div className="flex flex-col items-center">
      <p className="mb-[0.2rem] mt-6 text-body5-bold text-gray100">시간</p>
      <div className="flex items-center  gap-[0.9rem]">
        <NavItem onItemSelected={handleItemSelected} icon={<AllowDownIcon />}>
          <p className="text-body5-bold text-gray100">AM</p>
          <p className="text-body5-bold text-gray100">PM</p>
        </NavItem>
        <NavItem onItemSelected={handleItemSelected} icon={<AllowDownIcon />}>
          {times.map((number) => (
            <p className="text-body5-bold text-gray100" key={number}>
              {number}
            </p>
          ))}
        </NavItem>
        <div className="text-body5-bold text-gray100">:</div>
        <NavItem onItemSelected={handleItemSelected} icon={<AllowDownIcon />}>
          <div></div>
          <div className="max-h-[5rem] overflow-y-auto">
            {minutes.map((number) => (
              <p className="text-body5-bold text-gray100" key={number}>
                {number}
              </p>
            ))}
          </div>
        </NavItem>
      </div>
      <TextButton
        buttonSize="md"
        color="black"
        className="mt-[4.9rem] h-[3.2rem] w-[20.7rem] text-body5-bold text-gray100"
      >
        완료
      </TextButton>
    </div>
  );
}
