import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TextButton from '@/components/common/TextButton';
import IssuesModal from '@/components/Modal/IssuesModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { useModal } from '@/contexts/ModalProvider';
import { Issue, Issues } from '@/types/issueTypes';
import { Team } from '@/types/teamTypes';

interface KanbanBoardProps {
  issues: Issues;
  type: 'main' | 'page';
  team?: Team;
}

export default function KanbanBoard({
  issues: { todoIssues, progressIssues, doneIssues },
  type,
  team,
}: KanbanBoardProps) {
  const [todoList, setTodoList] = useState<Issue[] | []>([]);
  const [progressList, setProgressList] = useState<Issue[] | []>([]);
  const [doneList, setDoneList] = useState<Issue[] | []>([]);

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <IssuesModal closeClick={close} />);
  };

  useEffect(() => {
    setTodoList(todoIssues);
    setProgressList(progressIssues);
    setDoneList(doneIssues);
  }, [todoIssues, progressIssues, doneIssues]);

  const kanbanBoardClasses = clsx({
    'justify-between h-full w-content': type === 'main',
    'justify-center absolute top-[3.7rem] bottom-[2.4rem] left-0 right-0': type === 'page',
  });

  return (
    <>
      <div className={clsx('flex gap-[2.4rem]', kanbanBoardClasses)}>
        <IssueList status="todo" issues={todoList} team={team} />
        <IssueList status="progress" issues={progressList} team={team} />
        <IssueList status="done" issues={doneList} team={team} />
      </div>
      {type === 'page' && (
        <TextButton
          buttonSize="sm"
          onClick={handleModalClick}
          className="absolute right-12 top-[3.6rem]"
        >
          게시하기
        </TextButton>
      )}
    </>
  );
}
