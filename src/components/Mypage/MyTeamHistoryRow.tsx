import { MEMBER } from '@/constants/Team';
import ManageTeamHistoryModal from '../Modal/ManageTeamHistoryModal';
import TextButton from '../common/TextButton';
import { useModal } from '@/contexts/ModalProvider';
import { Team } from '@/types/teamTypes';
import ColorChipIcon from '@/assets/ColorChipIcon';

interface MyTeamRowProps {
  team: Team;
  myUsername?: string;
}

export default function MyTeamHistoryRow({ team, myUsername }: MyTeamRowProps) {
  const { id, color, name, members } = team;
  const me = members?.find((member) => member.username === myUsername);
  const { role, grade, createdDate } = me || {};

  const openModal = useModal();
  const handleManageClick = () => {
    grade &&
      role !== undefined &&
      role !== null &&
      openModal(({ close }) => (
        <ManageTeamHistoryModal
          id={id}
          teamname={name}
          grade={grade}
          role={role}
          onClose={close}
        ></ManageTeamHistoryModal>
      ));
  };

  return (
    <tr className="h-[6.1rem] text-black">
      <th className="w-24 rounded-bl-[0.6rem] rounded-tl-[0.6rem] border-y border-l border-solid border-gray20">
        <ColorChipIcon fill={color} className="float-right mr-4"></ColorChipIcon>
      </th>
      <th className="border-y border-solid border-gray20 text-body4-bold text-gray100">{name}</th>
      <th className="border-y border-solid border-gray20 text-body3-regular">
        {role ? MEMBER.ROLE[role] : '역할 미지정'}
      </th>
      <th className="border-y border-solid border-gray20 text-body3-regular">
        {grade && MEMBER.GRADE[grade]}
      </th>
      <th className="border-y border-solid border-gray20 text-body3-regular">{createdDate}</th>
      <th className="w-[11.5rem] rounded-br-[0.6rem] rounded-tr-[0.6rem] border-y border-r border-solid border-gray20">
        <TextButton
          onClick={handleManageClick}
          buttonSize="sm"
          color="white"
          className="h-[3.3rem] font-medium"
        >
          관리
        </TextButton>
      </th>
    </tr>
  );
}
