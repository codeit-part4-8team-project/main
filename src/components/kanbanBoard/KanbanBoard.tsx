import { useState } from 'react';
import TextButton from '@/components/common/TextButton';
import GroupModal from '@/components/Modal/GroupModal';
import IssueList from '@/components/kanbanBoard/IssueList';

interface KanbanBoardProps {
  page: 'main' | 'issue';
  hasButton?: boolean;
}

interface KanbanBoardItemProps {
  title: string;
}

export default function KanbanBoard({ page, hasButton = false }: KanbanBoardProps) {
  const justifyContent = page === 'issue' ? 'justify-start' : 'justify-between';

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className={`w-content relative flex h-full ${justifyContent} gap-[2.4rem]`}>
        <KanbanBoardItem title="할 일 3" />
        <KanbanBoardItem title="진행 중 1" />
        <KanbanBoardItem title="백로그 1" />
        {hasButton && (
          <TextButton
            buttonSize="sm"
            onClick={handleToggleModalClick}
            className="absolute -top-[6.3rem] right-0"
          >
            생성하기
          </TextButton>
        )}
      </div>
    </>
  );
}

function KanbanBoardItem({ title }: KanbanBoardItemProps) {
  return (
    <div className="flex h-full w-full max-w-[34.2rem] flex-col gap-[2.4rem] rounded-[2.4rem] bg-[#FCFCFC] px-12 pt-12 shadow-[0_0_1rem_0_rgba(17,17,17,0.05)]">
      <span className="text-body2-bold text-gray80">{title}</span>
      <IssueList />
    </div>
  );
}
