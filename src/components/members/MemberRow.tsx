import { MEMBER } from '@/constants/Team';
import TextButton from '../common/TextButton';
import { Member } from '@/types/teamTypes';
import ProfileIcon from '@/assets/ProfileIcon';

interface MemberRowProps {
  member: Member;
}

export default function MemberRow({ member }: MemberRowProps) {
  const { imageUrl, role, grade, username, createdDate } = member;

  return (
    <tr className="even:bg-white-light h-[5.6rem] bg-opacity-20">
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
      <th className="">{username}</th>
      <th>{'linda@mail.com'}</th>
      <th>{role ? MEMBER.ROLE[role] : '역할 미지정'}</th>
      <th>{MEMBER.GRADE[grade]}</th>
      <th>{createdDate}</th>
      <th>
        <TextButton buttonSize="sm" color="red" className="h-[3.6rem] font-medium">
          추방
        </TextButton>
      </th>
    </tr>
  );
}
