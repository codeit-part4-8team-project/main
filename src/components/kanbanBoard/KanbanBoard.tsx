/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import clsx from 'clsx';
import TextButton from '@/components/common/TextButton';
import IssuesModal from '@/components/Modal/IssuesModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { useIssueContext } from '@/contexts/IssueProvider';
import { useModal } from '@/contexts/ModalProvider';
import { Issues } from '@/types/issueTypes';

interface KanbanBoardProps {
  issueBoardData: Issues;
  type: 'main' | 'page';
  reloadIssueBoard: () => void;
}

export default function KanbanBoard({
  issueBoardData: { team: teamInfo, todoIssues, progressIssues, doneIssues },
  type,
  reloadIssueBoard,
}: KanbanBoardProps) {
  const { todoList, progressList, doneList, setTodoList, setProgressList, setDoneList } =
    useIssueContext();

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) =>
      teamInfo ? (
        <IssuesModal
          teamId={teamInfo.id}
          team={teamInfo}
          closeClick={close}
          reloadIssueBoard={reloadIssueBoard}
        />
      ) : (
        <IssuesModal closeClick={close} reloadIssueBoard={reloadIssueBoard} />
      ),
    );
  };

  useEffect(() => {
    setTodoList(todoIssues);
    setProgressList(progressIssues);
    setDoneList(doneIssues);
  }, [todoIssues, progressIssues, doneIssues]);

  const kanbanBoardClasses = clsx({
    'justify-between h-full w-content': type === 'main',
    'justify-center h-full top-[3.7rem] bottom-[2.4rem] left-0 right-0 min-[1870px]:absolute':
      type === 'page',
  });

  return (
    <>
      <div className={clsx('flex gap-[2.4rem]', kanbanBoardClasses)}>
        <IssueList
          status="TODO"
          issues={todoList}
          team={teamInfo}
          reloadIssueBoard={reloadIssueBoard}
        />
        <IssueList
          status="INPROGRESS"
          issues={progressList}
          team={teamInfo}
          reloadIssueBoard={reloadIssueBoard}
        />
        <IssueList
          status="DONE"
          issues={doneList}
          team={teamInfo}
          reloadIssueBoard={reloadIssueBoard}
        />
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
