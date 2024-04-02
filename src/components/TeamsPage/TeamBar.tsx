import { useParams } from 'react-router-dom';
import ProfileStack from '@/components/common/ProfileStack';
import TextButton from '@/components/common/TextButton';
import InvitationGroupModal from '@/components/Modal/InvitationGroupModal';
import TeamTab from '@/components/TeamsPage/TeamTab';
import { useModal } from '@/contexts/ModalProvider';
import { useTeam } from '@/contexts/TeamProvider';
import { getProfilesImgs } from '@/lib/getProfileImgs';
import ColorChipIcon from '@/assets/ColorChipIcon';
import InviteIcon from '@/assets/InviteIcon';

export default function TeamBar() {
  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <InvitationGroupModal closeClick={close} />);
  };

  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const {
    team: { color, name, members },
  } = useTeam(teamId);

  const profileImgs = members ? getProfilesImgs(members) : [];

  return (
    <div className="absolute left-[28.4rem] right-[2.4rem] top-[8.5rem] grid grid-cols-[14rem_auto_auto] items-center gap-[6.2rem]">
      <div className="flex w-[20rem] gap-4">
        <ColorChipIcon fill={color} />
        <span className="text-body1-bold text-gray100">{name}</span>
      </div>
      <TeamTab />
      <div className="flex items-center gap-[1.6rem] justify-self-end">
        <TextButton
          buttonSize="sm"
          color="white"
          onClick={handleModalClick}
          className="flex h-[3.6rem] w-[8.7rem] gap-[0.8rem] border-0"
        >
          <InviteIcon />
          <span>초대</span>
        </TextButton>
        <ProfileStack profileImgs={profileImgs} size="lg" />
      </div>
    </div>
  );
}
