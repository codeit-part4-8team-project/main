import { MEMBER } from '@/constants/Team';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MemberRow from './MemberRow';
import { useMemberPageContext } from '@/pages/team/TeamMembers';
import { usePagenation } from '@/contexts/PageProvider';
import { defaultInstance } from '@/hooks/useAxios';
import { Member } from '@/types/teamTypes';

interface MemberTableProps {
  members: Member[];
}

interface FieldValues {
  [key: string]: string;
}

export default function MemberTable({ members }: MemberTableProps) {
  const { inEditing, setInEditing, userAsTeamMember } = useMemberPageContext();
  const { refetch } = usePagenation();
  const defaultFormValues = members.reduce<FieldValues>((acc, member) => {
    acc[String(member.id)] = MEMBER.GRADE[member.grade];
    return acc;
  }, {});

  const {
    handleSubmit,
    formState: { isDirty, dirtyFields }, //등급이 변경됐을 때, 변경된 유저만 모아서 요청하도록 해야함.
    control,
    reset,
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: defaultFormValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!isDirty || !inEditing) {
      setInEditing((prev) => !prev);
      return;
    }

    if (confirm('변경사항을 저장하시겠습니까?')) {
      try {
        const memberUpdates = Object.keys(dirtyFields).map((memberId) => {
          const gradeValue = formData[memberId];
          const grade = Object.keys(MEMBER.GRADE).find(
            (key) => MEMBER.GRADE[key as keyof typeof MEMBER.GRADE] === gradeValue,
          );

          const dirtyRowMember = members.find((member) => member.id === Number(memberId));
          const role = dirtyRowMember?.role || null;
          console.log(memberId, grade, role);

          return defaultInstance.patch(`/member/${memberId}`, { role, grade });
        });
        await Promise.allSettled(memberUpdates);
        refetch && refetch();
      } catch (error) {
        alert('변경사항 저장에 실패하였습니다.');
      } finally {
        console;
        setInEditing(false);
      }
    } else {
      setInEditing(false);
    }
  };

  useEffect(() => {
    reset();
  }, [inEditing]); //유저가 편집 상태를 왔다갔다 할 경우 isDirty가 항상 true인 문제를 해결하기 위한 reset

  const onlyOneOwner = members.filter((member) => member.grade === 'OWNER').length === 1;
  //Owner 등급이 한 명 뿐일 경우 Owner더라도 자신의 등급도 변경 불가
  return (
    <form id="editMemberForm" onSubmit={handleSubmit(onSubmit)}>
      <table className="w-full table-fixed border-collapse">
        <thead className="sticky top-0 h-[4.4rem] bg-[#F6F8FA] text-left text-body3-bold text-black">
          <tr>
            <th className="w-[11.4rem]"></th>
            <th>이름</th>
            <th>유저네임</th>
            <th>역할</th>
            <th>등급</th>
            <th>가입날짜</th>
            <th>{inEditing && '관리'}</th>
          </tr>
        </thead>
        <tbody className="text-left text-body3-bold text-black">
          {members &&
            members.map((member) => {
              return (
                <MemberRow
                  key={member.id}
                  member={member}
                  inEditing={inEditing}
                  control={control}
                  editor={userAsTeamMember}
                  onlyOneOwner={onlyOneOwner}
                />
              );
            })}
        </tbody>
      </table>
    </form>
  );
}
