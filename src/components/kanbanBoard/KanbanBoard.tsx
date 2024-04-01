import clsx from 'clsx';
import TextButton from '@/components/common/TextButton';
import IssuesModal from '@/components/Modal/IssuesModal';
import IssueList from '@/components/kanbanBoard/IssueList';
import { useModal } from '@/contexts/ModalProvider';
import { Issues } from '@/types/issueTypes';

interface KanbanBoardProps {
  issues: Issues;
  type: 'main' | 'page';
}

export default function KanbanBoard({ issues, type }: KanbanBoardProps) {
  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <IssuesModal closeClick={close} />);
  };

  const kanbanBoardClasses = clsx({
    'justify-between h-full w-content': type === 'main',
    'justify-center absolute top-[3.7rem] bottom-[2.4rem] left-0 right-0': type === 'page',
  });

  return (
    <>
      <div className={clsx('flex gap-[2.4rem]', kanbanBoardClasses)}>
        <IssueList status="todo" issues={issues.todoIssues} />
        <IssueList status="progress" issues={issues.progressIssues} />
        <IssueList status="done" issues={issues.doneIssues} />
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
