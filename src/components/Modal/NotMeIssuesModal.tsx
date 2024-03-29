import profile from '../../../public/profile.svg';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { useAxios } from '@/hooks/useAxios';

interface NotMeLssuesModalProps {
  closeClick: () => void;
}

// "assignedMembers": [
//   {
//     "name": "string",
//     "imageUrl": "string",
//     "role": "string",
//     "grade": "string",
//     "username": "string",
//     "createdDate": "2024-03-29"
//   }
// ],

interface UserType {
  name: string;
  imageUrl: string;
  role?: string;
  grade: string;
  username: string;
  createDate: string;
}

interface DefaultValueType {
  title?: string;
  content?: string;
  assignedMembers?: UserType[];
  author?: UserType;
}

export default function NotMeIssuesModal({ closeClick }: NotMeLssuesModalProps) {
  // 빨리 연동해서 프롭으로 받아야지 ㅠㅠ
  const teamId = 10;
  const issueId = -31;
  const { data: defaultValue } = useAxios(
    {
      path: `issue/${issueId}`,
    },
    true,
  );

  console.log(defaultValue);

  const { title, author, content, assignedMembers }: DefaultValueType = defaultValue || {};
  const TextSize = 'text-body3-medium';
  const divTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30  px-[1.8rem] py-[1.2rem] w-full';

  return (
    <ModalLayout closeClick={closeClick} title="할 일">
      <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
        <p className={`${TextSize} mb-[1.6rem]`}>게시자 (나)</p>
        <div className="mb-16 flex items-center gap-4">
          <img
            src={author?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
          />
          {/* 데이터 받아지면 변경 예정구역 */}
          {/* <p className=" text-[1.4rem]">userNickName</p> */}
          <p className=" text-[1.4rem]">{author?.username}</p>
        </div>

        <p className={`${TextSize} mb-[0.8rem]`}>이슈</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>{title}</div>
        <p className={`${TextSize} mb-[0.8rem]`}>내용</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>{content}</div>
        <p className={`${TextSize} mb-[0.8rem] mt-12`}>팀원</p>
        <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
          <ModalMemberList formTextSize={TextSize} memberData={assignedMembers} owner={author} />
        </div>
      </ModalFormBorder>
    </ModalLayout>
  );
}
