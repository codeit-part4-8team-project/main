import { kanbanBoardInfo } from '@/mockdata/issueData';
import NoCard from '@/components/common/NoCard';
// import ProfileStack from '@/components/common/ProfileStack';
import { Issue } from '@/types/issueTypes';
import ColorChipIcon from '@/assets/ColorChipIcon';
import ProfileIcon from '@/assets/ProfileIcon';

// const profiles = [ProfileImg, ProfileImg, ProfileImg];

interface IssueListProps {
  status: 'todo' | 'progress' | 'done';
}

interface IssueItemProps {
  issue: Issue;
}

export default function IssueList({ status }: IssueListProps) {
  const issues: Issue[] = kanbanBoardInfo[`${status}Issues`];

  return (
    <div className="flex h-full flex-col gap-[1.5rem] overflow-scroll pb-12">
      {issues ? (
        issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
      ) : (
        <NoCard backgroundColor="[#F6F6F6]">이슈가 없습니다.</NoCard>
      )}
    </div>
  );
}

function IssueItem({ issue }: IssueItemProps) {
  const { title, content, teamName } = issue;

  return (
    <div className="relative min-h-64 rounded-[2.4rem] border border-gray30 bg-white p-8">
      <div className="flex flex-col gap-[1.2rem]">
        <div className="flex items-center gap-4">
          <ColorChipIcon />
          <div className="text-body4-bold text-gray100">{title}</div>
        </div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">{content}</span>
      </div>
      <button className="absolute right-8 top-8"></button>
      <button
        className={`absolute bottom-8 left-8 flex items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[1rem]`}
      >
        {/* TODO 왜 색상 적용이 안 됨? */}
        {teamName}
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileIcon size="sm" />
        {/* <ProfileStack profileImgs={profiles} /> */}
      </div>
    </div>
  );
}
