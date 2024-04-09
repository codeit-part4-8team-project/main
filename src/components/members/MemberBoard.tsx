import TextButton from '../common/TextButton';
import Pagenation from '../common/pagenation/Pagenation';
import MemberTable from './MemberTable';
import { useMemberPageContext } from '@/pages/team/TeamMembers';

export default function MemberBoard() {
  const { inEditing, members, userGrade } = useMemberPageContext();
  const hasAuthority = userGrade === 'OWNER' || userGrade === 'MANAGER';
  return (
    <div className="flex h-full flex-col items-center justify-between gap-[4.6rem] pt-[1.2rem]">
      <div className=" h-full overflow-auto rounded-[0.6rem] bg-white">
        <MemberTable members={members}></MemberTable>
      </div>
      <Pagenation></Pagenation>
      {hasAuthority && (
        <TextButton
          buttonSize="sm"
          form="editMemberForm"
          className="absolute right-12 top-12 h-[3.6rem]"
        >
          {inEditing ? '완료' : '관리'}
        </TextButton>
      )}
    </div>
  );
}
