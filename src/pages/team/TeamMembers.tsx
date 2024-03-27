import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import MemberList from '@/components/members/MemberList';
import { useTeam } from '@/contexts/TeamProvider';

export default function TeamMembers() {
  const { teamId } = useParams();
  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { team } = useTeam(teamId);

  return <BoardSection title="Members" content={<MemberList members={team.members} />} />;
}
