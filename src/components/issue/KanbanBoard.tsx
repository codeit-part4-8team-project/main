import { useState } from 'react';
import IssuesModal from '../Modal/IssuesModal';
import Button from '../common/Button';
import IssueCards from './IssueCards';

export default function KanbanBoard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex h-[110.7rem] w-[113.2rem] flex-col gap-[1rem] border-[0.1rem] border-[#DCDCDC] bg-white p-[2.4rem]">
      <div className="flex justify-between">
        <span className="text-[1.6rem]">칸반보드</span>
        {isOpen && <IssuesModal closeClick={handleCloseClick} />}
        <Button text="이슈 생성" submit={handleButtonClick} />
      </div>
      <div className="h-full">
        <IssueCards />
      </div>
    </div>
  );
}
