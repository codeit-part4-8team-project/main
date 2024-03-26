import { useState } from 'react';
import TextButton from '@/components/common/TextButton';
import GroupModal from '@/components/Modal/GroupModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { Issues } from '@/types/issueTypes';

interface KanbanBoardProps {
  issues: Issues;
  page: 'main' | 'issue' | 'team';
  hasButton?: boolean;
}

export default function KanbanBoard({ issues, page, hasButton = false }: KanbanBoardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const justifyContent = page === 'issue' ? 'justify-start' : 'justify-between';

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className={`w-content relative flex h-full ${justifyContent} gap-[2.4rem]`}>
        <IssueList status="todo" issues={issues.todoIssues} />
        <IssueList status="progress" issues={issues.progressIssues} />
        <IssueList status="done" issues={issues.doneIssues} />
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
