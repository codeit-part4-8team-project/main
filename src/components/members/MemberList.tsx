import MemberRow from '@/components/members/MemberRow';
import { Member } from '@/types/teamTypes';

interface MemberListProps {
  members?: Member[];
}

export default function MemberList({ members }: MemberListProps) {
  return (
    <div className="h-full pt-[1.2rem]">
      <div className=" h-full overflow-auto rounded-[0.6rem] bg-white">
        <table className="w-full table-fixed border-collapse">
          <thead className="sticky top-0 h-[4.4rem] bg-[#F6F8FA] text-left text-body3-bold text-black">
            <tr>
              <th className="w-[11.4rem]"></th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>역할</th>
              <th>등급</th>
              <th>가입날짜</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody className="text-left text-body3-bold text-black">
            {members &&
              members.map((member) => {
                return <MemberRow key={member.username} member={member} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
