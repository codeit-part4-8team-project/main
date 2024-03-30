import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextButton from '@/components/common/TextButton';
import InvitationGroupModal from '@/components/Modal/InvitationGroupModal';
import TeamTab from '@/components/TeamsPage/TeamTab';
import { useTeam } from '@/contexts/TeamProvider';
import ColorChipIcon from '@/assets/ColorChipIcon';
import InviteIcon from '@/assets/InviteIcon';

export default function TeamBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const {
    team: { color, name },
  } = useTeam(teamId);

  return (
    <div className="absolute -top-[5.7rem] left-0 right-0 grid grid-cols-[14rem_auto_auto] items-center gap-[6.2rem]">
      {isOpen && <InvitationGroupModal closeClick={handleToggleModalClick} />}
      <div className="flex w-[14rem] gap-4">
        <ColorChipIcon fill={color} />
        <span className="text-body1-bold text-gray100">{name}</span>
      </div>
      <TeamTab />
      <TextButton
        buttonSize="sm"
        color="white"
        onClick={handleToggleModalClick}
        className="flex h-[3.6rem] w-[8.7rem] gap-[0.8rem] justify-self-end border-0"
      >
        <InviteIcon />
        <span>초대</span>
      </TextButton>
    </div>
  );
}
