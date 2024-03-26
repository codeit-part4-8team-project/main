import { useTeam } from '@/contexts/TeamProvider';
import { Issue } from '@/types/issueTypes';
import DragHandleIcon from '@/assets/DragHandleIcon';
import ProfileIcon from '@/assets/ProfileIcon';

interface IssueItemProps {
  issue: Issue;
}

export default function IssueItem({ issue: { title, content, team } }: IssueItemProps) {
  const pageTeam = useTeam();

  if (!team) {
    // 데이터에 team 정보가 없는 경우 = 현재 팀 페이지인 경우
    const { currentTeam } = pageTeam;
    team = currentTeam;
  }

  const { color, name } = team;

  return (
    <div className="relative min-h-64 w-[28.2rem] rounded-[2.4rem] border border-gray30 bg-white p-8">
      <div className="flex flex-col gap-[2.2rem]">
        <div className="text-body4-bold text-gray100">{title}</div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">{content}</span>
      </div>
      <button className="absolute right-8 top-6">
        <DragHandleIcon />
      </button>
      <button
        style={{ color }} /* TODO 임시 */
        className={`absolute bottom-8 left-8 flex h-[1.8rem] items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[0.8rem] font-medium`}
      >
        {name}
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileIcon size="sm" />
        {/* <ProfileStack profileImgs={profiles} /> */}
      </div>
    </div>
  );
}
