import ProfileStack from '@/components/common/ProfileStack';
import MyIssuesModal from '@/components/Modal/MyIssuesModal';
import NotMeIssuesModal from '@/components/Modal/NotMeIssuesModal';
import { useIssueContext } from '@/contexts/IssueProvider';
import { useModal } from '@/contexts/ModalProvider';
import { getProfilesImgs } from '@/lib/getProfileImgs';
import { Issue } from '@/types/issueTypes';
import { Team } from '@/types/teamTypes';
import DragHandleIcon from '@/assets/DragHandleIcon';

interface IssueItemProps {
  issue: Issue;
  isMine: boolean;
  teamInfo?: Team;
  reloadIssueBoard: () => void;
}

export default function IssueItem({
  issue: { id, title, content, team, assignedMembers },
  isMine,
  teamInfo,
  reloadIssueBoard,
}: IssueItemProps) {
  if (teamInfo) team = teamInfo;

  if (!team) {
    throw Error('팀 정보가 없습니다.');
  }

  const { color, name, id: teamId } = team;

  const profileImgs = assignedMembers ? getProfilesImgs(assignedMembers) : [];

  const { handleOnDrag } = useIssueContext();

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) =>
      isMine ? (
        <MyIssuesModal
          closeClick={close}
          reloadIssueBoard={reloadIssueBoard}
          issueId={id}
          teamId={teamId}
        />
      ) : (
        <NotMeIssuesModal closeClick={close} issueId={id} />
      ),
    );
  };

  return (
    <div
      onClick={handleModalClick}
      draggable
      onDragStart={() => handleOnDrag(id)}
      className="relative min-h-64 w-full cursor-pointer rounded-[2.4rem] border border-gray30 bg-white p-8"
    >
      <div className="flex flex-col gap-[2.2rem]">
        <div className="text-body4-bold text-gray100">{title}</div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">{content}</span>
      </div>
      <button className="absolute right-8 top-6">
        <DragHandleIcon />
      </button>
      <button
        style={{ color }}
        className={`absolute bottom-8 left-8 flex h-[1.8rem] items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[0.8rem] font-medium`}
      >
        {name}
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileStack profileImgs={profileImgs} size="sm" />
      </div>
    </div>
  );
}
