import MyTeamHistoryRow from './MyTeamHistoryRow';
import NoTeamRow from './NoTeamRow';
import { usePagenation } from '@/contexts/PageProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { Team } from '@/types/teamTypes';

export default function MyTeamHistoryTable() {
  const { dataContent } = usePagenation();
  const myTeams = dataContent as Team[];
  const { user } = useUserContext();

  return (
    <table className="relative w-full table-fixed border-separate border-spacing-y-[0.8rem] overflow-auto">
      <thead className="sticky top-0 h-[4.4rem] bg-[#F6F8FA] text-left text-body3-bold text-black">
        <tr>
          <th className="w-24 rounded-tl-[0.6rem]"></th>
          <th>그룹 이름</th>
          <th>역할</th>
          <th>등급</th>
          <th>가입날짜</th>
          <th className="w-[11.5rem] rounded-tr-[0.6rem]"></th>
        </tr>
      </thead>
      <tbody className="text-left text-body3-bold text-black">
        {myTeams.length ? (
          myTeams.map((team) => {
            return (
              <MyTeamHistoryRow key={`teams-${team.id}`} team={team} myUsername={user?.username} />
            );
          })
        ) : (
          <NoTeamRow />
        )}
      </tbody>
    </table>
  );
}
