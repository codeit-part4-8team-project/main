import { useState } from 'react';
import clsx from 'clsx';
import TextButton from '@/components/common/TextButton';
import GroupModal from '@/components/Modal/GroupModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { Issues } from '@/types/issueTypes';

interface KanbanBoardProps {
  issues: Issues;
  type: 'main' | 'page';
}

export default function KanbanBoard({ issues, type }: KanbanBoardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  const kanbanBoardClasses = clsx({
    'justify-between h-full w-content': type === 'main',
    'justify-center absolute top-[3.7rem] bottom-[2.4rem] left-0 right-0': type === 'page',
  });

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className={clsx('flex gap-[2.4rem]', kanbanBoardClasses)}>
        <IssueList status="todo" issues={issues.todoIssues} />
        <IssueList status="progress" issues={issues.progressIssues} />
        <IssueList status="done" issues={issues.doneIssues} />
      </div>
      {type === 'page' && (
        <TextButton
          buttonSize="sm"
          onClick={handleToggleModalClick}
          className="absolute right-12 top-[3.6rem]"
        >
          게시하기
        </TextButton>
      )}
    </>
  );
}
