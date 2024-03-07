import { useState } from 'react';
import AnnouncementModal from '../Modal/AnnouncementModal';
import Button from '../common/Button';
import AnnouncementCards from './AnnouncementCards';

export default function AnnouncementBoard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex h-[110.7rem] w-fit flex-col gap-[1rem] border-[0.1rem] border-[#DCDCDC] bg-white p-[2.4rem]">
      <div className="flex justify-between">
        <span className="text-[1.6rem]">팀 공지사항</span>
        {isOpen && <AnnouncementModal closeClick={handleCloseClick} />}
        <Button text="게시" submit={handleButtonClick} />
      </div>
      <div className="h-full">
        <AnnouncementCards />
      </div>
    </div>
  );
}
