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

const TITLE = {
  todo: '할 일',
  progress: '진행 중',
  done: '백로그',
};

export default function IssueList({ status }: IssueListProps) {
  const issues: Issue[] = kanbanBoardInfo[`${status}Issues`];

  return (
    <div className="flex h-full w-full max-w-[34.2rem] flex-col gap-[2.4rem] rounded-[2.4rem] bg-[#FCFCFC] px-12 pt-12 shadow-[0_0_1rem_0_rgba(17,17,17,0.05)]">
      <span className="text-body2-bold text-gray80">{`${TITLE[status]} ${issues.length}`}</span>
      <div className="flex h-full flex-col gap-[1.5rem] overflow-scroll pb-12">
        {issues ? (
          issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
        ) : (
          <NoCard backgroundColor="[#F6F6F6]">이슈가 없습니다.</NoCard>
        )}
      </div>
    </div>
  );
}

function IssueItem({ issue }: IssueItemProps) {
  const { title, content, teamName, teamColor } = issue;

  return (
    <div className="relative min-h-64 w-[28.2rem] rounded-[2.4rem] border border-gray30 bg-white p-8">
      <div className="flex flex-col gap-[1.2rem]">
        <div className="flex items-center gap-4">
          <ColorChipIcon fill={teamColor} />
          <div className="text-body4-bold text-gray100">{title}</div>
        </div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">{content}</span>
      </div>
      <button className="absolute right-8 top-8"></button>
      <button
        style={{ color: teamColor }} /* TODO 논의 필요 */
        className="absolute bottom-8 left-8 flex items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[1rem]"
      >
        {teamName}
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileIcon size="sm" />
        {/* <ProfileStack profileImgs={profiles} /> */}
      </div>
    </div>
  );
}
