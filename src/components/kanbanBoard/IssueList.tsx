import NoCard from '@/components/common/NoCard';
import IssueItem from '@/components/kanbanBoard/IssueItem';
import { Issue } from '@/types/issueTypes';
import { Team } from '@/types/teamTypes';

interface IssueListProps {
  status: 'todo' | 'progress' | 'done';
  issues: Issue[] | [];
  team?: Team;
}

const TITLE = {
  todo: '할 일',
  progress: '진행 중',
  done: '백로그',
};

export default function IssueList({ status, issues = [], team }: IssueListProps) {
  return (
    <div className="flex w-full max-w-[34.2rem] flex-col gap-[2.4rem] rounded-[2.4rem] bg-white px-12 pt-12 shadow-[0_0_1rem_0_rgba(17,17,17,0.05)]">
      <span className="text-body2-bold text-gray80">{`${TITLE[status]} ${issues.length}`}</span>
      <div className="flex h-full flex-col gap-[1.5rem] overflow-scroll pb-12">
        {issues.length !== 0 ? (
          issues.map((issue) => <IssueItem key={issue.id} issue={issue} teamInfo={team} />)
        ) : (
          <NoCard type="issue" backgroundColor="bg-[#F6F6F6]">
            이슈가 없습니다.
          </NoCard>
        )}
      </div>
    </div>
  );
}
