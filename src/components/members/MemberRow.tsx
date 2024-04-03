import { MEMBER } from '@/constants/Team';
import { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import Dropdown from '../common/Dropdown';
import TextButton from '../common/TextButton';
import { defaultInstance } from '@/hooks/useAxios';
import { Member } from '@/types/teamTypes';
import ProfileIcon from '@/assets/ProfileIcon';

interface MemberRowProps {
  member: Member;
  inEditing: boolean;
  control: Control;
  editor: Member;
  onlyOneOwner: boolean;
}

export default function MemberRow({
  member,
  inEditing,
  control,
  editor,
  onlyOneOwner,
}: MemberRowProps) {
  const { id, imageUrl, name, username, role, grade, createdDate } = member;
  const rowRef = useRef<HTMLTableRowElement>(null);
  const isOwnersRow = grade === 'OWNER';
  //매니저는 오너꺼 일반 행으로 보여야함. 오너는 자기만 건드릴 수 있고. 추방버튼은 x
  //오너로우면 > 자기꺼 아니면 컨트롤러 안뜨게
  const isEditorsRow = editor.username === username;
  const isOwnersOwnRow = isOwnersRow && isEditorsRow;
  //권한 별 편집가능 등급 설정
  const gradeOption = Object.values(MEMBER.GRADE);
  const gradeOptionExeptOwner = gradeOption.filter((grade) => grade !== 'OWNER');
  const editableGradeOption = editor.grade === 'OWNER' ? gradeOption : gradeOptionExeptOwner;

  const handleDeleteClick = async () => {
    if (confirm(`정말 ${name} 님을 추방하시겠습니까?`)) {
      try {
        await defaultInstance.delete(`/member/${id}`, { data: { username } });
        if (rowRef.current) {
          rowRef.current.style.display = 'none';
        }
      } catch {
        alert('팀원 내보내기에 실패하였습니다.');
      }
    }
  };

  return (
    <tr className="h-[5.6rem] bg-opacity-20 even:bg-white-light" ref={rowRef}>
      <th className="w-[11.4rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="프로필 미리보기"
            className="mx-auto size-[3.2rem] rounded-full object-cover"
          ></img>
        ) : (
          <ProfileIcon size="lg" className="mx-auto size-[3.2rem]"></ProfileIcon>
        )}
      </th>
      <th className="">{name}</th>
      <th>{username}</th>
      <th>{role ? MEMBER.ROLE[role] : '역할 미지정'}</th>
      <th className="pr-[14.5rem]">
        {inEditing && (!isOwnersRow || (isOwnersOwnRow && !onlyOneOwner)) ? (
          <Controller
            name={String(id)}
            control={control}
            render={({ field }) => (
              <Dropdown
                options={Object.values(editableGradeOption)}
                initialOption={MEMBER.GRADE[grade]}
                selectedOption={field.value}
                onSelect={(value) => {
                  field.onChange(value);
                }}
                className="h-[4.4rem] min-w-[11.7rem]"
              />
            )}
          />
        ) : (
          MEMBER.GRADE[grade]
        )}
      </th>
      <th>{createdDate}</th>
      <th>
        {inEditing && !isOwnersRow && !isEditorsRow && (
          <TextButton
            buttonSize="sm"
            color="red"
            className="h-[3.6rem]"
            onClick={handleDeleteClick}
          >
            내보내기
          </TextButton>
        )}
      </th>
    </tr>
  );
}
