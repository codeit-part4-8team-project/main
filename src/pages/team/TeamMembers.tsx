import { DEFAULT_MEMBER } from '@/constants/Team';
import { ReactNode, createContext, useContext, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import MemberBoard from '@/components/members/MemberBoard';
import { usePagenation } from '@/contexts/PageProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { Grade, Member } from '@/types/teamTypes';

interface MemberPageContextValue {
  inEditing: boolean;
  setInEditing: React.Dispatch<React.SetStateAction<boolean>>;
  members: Member[];
  userAsTeamMember: Member;
  userGrade: Grade;
}

const MemberPageContext = createContext<MemberPageContextValue>({
  inEditing: false,
  setInEditing: () => {},
  members: [DEFAULT_MEMBER],
  userAsTeamMember: DEFAULT_MEMBER,
  userGrade: 'TEAM_MEMBER',
});

export function MemberPageProvider({ children }: { children: ReactNode }) {
  const [inEditing, setInEditing] = useState<boolean>(false);
  const { user } = useUserContext();
  const { dataContent } = usePagenation();
  const members = dataContent as Member[];
  const _userAsTeamMember = members.find((member) => member.username === user?.username);
  const userAsTeamMember = _userAsTeamMember as Member;
  const userGrade = userAsTeamMember?.grade;

  return (
    <MemberPageContext.Provider
      value={{
        inEditing,
        setInEditing,
        members,
        userAsTeamMember,
        userGrade,
      }}
    >
      {children}
    </MemberPageContext.Provider>
  );
}

export function useMemberPageContext() {
  const context = useContext(MemberPageContext);
  if (!context) {
    throw new Error('StepProvider 외부.');
  }

  return context;
}

export default function TeamMembers() {
  return (
    <BoardSection title="Members">
      <MemberPageProvider>
        <MemberBoard></MemberBoard>
      </MemberPageProvider>
    </BoardSection>
  );
}
