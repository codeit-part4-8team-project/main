import { useParams } from 'react-router-dom';
import TeamTab from '@/components/TeamsPage/TeamTab';
import { useTeam } from '@/contexts/TeamProvider';
import ColorChipIcon from '@/assets/ColorChipIcon';

export default function TeamBar() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const {
    team: { color, name },
  } = useTeam(teamId);

  return (
    <div className="fixed top-[8.8rem] mb-12 flex items-center gap-[6.2rem]">
      <div className="flex w-fit gap-4">
        <ColorChipIcon fill={color} />
        <span className="text-body1-bold text-gray100">{name}</span>
      </div>
      <TeamTab />
    </div>
  );
}
