import profile from '../../../public/profile.svg';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { useAxios } from '@/hooks/useAxios';

interface NotMeLssuesModalProps {
  closeClick: () => void;
}

// GET 메서드 형식
// {
//   "id": 0,
//   "title": "string",
//   "author": {
//     "name": "string",
//     "imageUrl": "string",
//     "role": "string",
//     "grade": "string",
//     "username": "string"
//   },
//   "content": "string",
//   "assignedMembers": [
//     {
//       "name": "string",
//       "imageUrl": "string",
//       "role": "string",
//       "grade": "string",
//       "username": "string"
//     }
//   ],
//   "dueDate": "2024-03-24",
//   "status": "TODO",
//   "team": {
//     "id": 0,
//     "name": "string",
//     "description": "string",
//     "color": "string"
//   }
// }

export default function NotMeIssuesModal({ closeClick }: NotMeLssuesModalProps) {
  const { fetchData } = useAxios({});
  const TextSize = 'text-body3-medium';
  const divTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30  px-[1.8rem] py-[1.2rem] w-full';

  // 이건 생각해보니깐 안에서 axios를 부르는게 아니고 밖에서 불러야겠는데..?
  const handleGetNotMeIssue = () => {
    fetchData({
      newPath: `${teamId}/issue/${issueId}`,
    });
  };
  return (
    <ModalLayout closeClick={closeClick} title="할 일">
      <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
        <p className={`${TextSize} mb-[1.6rem]`}>게시자 (나)</p>
        <div className="mb-16 flex items-center gap-4">
          <img src={profile} alt="profile" />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">userNickName</p>
          {/*  */}
        </div>

        <p className={`${TextSize} mb-[0.8rem]`}>이슈</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>자기소개준비</div>
        <p className={`${TextSize} mb-[0.8rem]`}>내용</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>
          간단한자기소개가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <p className={`${TextSize} mb-[0.8rem] mt-12`}>팀원</p>
        <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
          {/* data map돌리고 싶은데 배열이 아닌것 같음. 얘기해서 배열로 바꿔줄수 있는지 여쭤보기 */}
          <ModalMemberList formTextSize={TextSize} />
        </div>
      </ModalFormBorder>
    </ModalLayout>
  );
}
