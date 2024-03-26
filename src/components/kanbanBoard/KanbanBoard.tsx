import { useEffect, useState } from 'react';
import TextButton from '@/components/common/TextButton';
import GroupModal from '@/components/Modal/GroupModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { useTeam } from '@/contexts/TeamProvider';
import { useAxios } from '@/hooks/useAxios';
import { IssueBoard } from '@/types/issueTypes';

interface KanbanBoardProps {
  page: 'main' | 'issue' | 'team';
  hasButton?: boolean;
}

export default function KanbanBoard({ page, hasButton = false }: KanbanBoardProps) {
  const [issues, setIssues] = useState<IssueBoard>({
    todoIssues: [],
    progressIssues: [],
    doneIssues: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const { currentTeam } = useTeam();
  const path = currentTeam ? `/${currentTeam.id}/issue/` : '/user/my-issue';

  const {
    loading: issueBoardLoading,
    error: issueBoardError,
    data: issueBoardData,
  } = useAxios<IssueBoard>(
    {
      path,
    },
    true,
  );

  useEffect(() => {
    if (issueBoardData && !issueBoardLoading) {
      setIssues(issueBoardData);
    }
    if (issueBoardError) {
      console.log('이슈보드 오류');
    }
  }, [issueBoardData, issueBoardLoading, issueBoardError]);

  const justifyContent = page === 'issue' ? 'justify-start' : 'justify-between';

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  // const { todoIssues, progressIssues, doneIssues } = issues;

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className={`w-content relative flex h-full ${justifyContent} gap-[2.4rem]`}>
        <IssueList status="todo" issues={issues.todoIssues} team={currentTeam} />
        <IssueList status="progress" issues={issues.progressIssues} team={currentTeam} />
        <IssueList status="done" issues={issues.doneIssues} team={currentTeam} />
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
