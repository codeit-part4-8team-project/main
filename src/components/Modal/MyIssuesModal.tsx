import { SubmitHandler, useForm } from 'react-hook-form';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { useAxios } from '@/hooks/useAxios';

interface IssuesModalProps {
  closeClick: () => void;
}

type Inputs = {
  title: string;
  content: string;
  assignedMembersUsernames: string[];
};

// put 메서드 형식
// {
//   "title": "string",
//   "content": "string",
//   "dueDate": "2024-03-24", // 동일하게 없음
// -> default value로 TODO 넣어주기
//   "status": "TODO", // 없음 -> 기본값 TODO 혹은, 드래그앤드롭에 해당하는 값이 알아서 들어옴
//   "assignedMembersUsernames": [
//     "string"
//   ]
// }
export default function MyIssuesModal({ closeClick }: IssuesModalProps) {
  const { data } = useAxios({
    path: `${teamId}/issue/${issueId}`,
  }); // console.log(data); // => 나중에 연동하고 ui 만들기

  const { fetchData: memberFetchData } = useAxios({}); // member tag GET axios
  const { fetchData } = useAxios({});
  const { register, watch, handleSubmit, getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const putIssue = {
      title: data.title,
      content: data.content,
      assignedMembersUsernames: data.assignedMembersUsernames, // 배열 타입에러 자꾸남
    };
    handlePutIssues(putIssue);
    console.log(putIssue);
  };
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleGetTeamMemberList = () => {
    const userName = getValues('assignedMembersUsernames');
    memberFetchData({
      newPath: `member/${teamsId}/search?username=${userName}`,
    });
  };

  const handlePutIssues = (data: Inputs) => {
    fetchData({
      newPath: `${teamsId}/issue/${issueId}`,
      newMethod: 'PUT',
      newData: data,
    });
  };
  // {
  //   "title": "string",
  //   "content": "string",
  //   "dueDate": "2024-03-20", // 이거 없고
  //   "status": "TODO", // 이거 없고
  //   "assignedMembersUsernames": [
  //     "string"
  //   ]
  // }
  return (
    <ModalLayout title="할 일" closeClick={closeClick} size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[64rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자 (나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
            {/*  */}
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="title" label="이슈*" className={`${formTextSize}`} />
            <ModalInput
              name="title"
              id="title"
              hookform={register('title')}
              placeholder="이슈를 작성해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {watch('title') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('title')?.length}/20</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
          )}
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="content" label="내용*" className={`${formTextSize}`} />
            <ModalInput
              name="content"
              id="content"
              hookform={register('content')}
              placeholder="해당 이슈의 내용을 작성해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {watch('content') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">
              {watch('content')?.length}/40
            </p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/40</p>
          )}
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel
              label="팀원 태그"
              className={`${formTextSize}`}
              htmlFor="assignedMembersUsernames"
            />
            <div className="flex items-center gap-[1.2rem]">
              <ModalInput
                name="assignedMembersUsernames"
                hookform={register('assignedMembersUsernames')}
                type="text"
                placeholder="닉네임을 검색해 주세요."
                id="assignedMembersUsernames"
                className={`${inputTextSize} ${borderStyle} `}
              />
              <TextButton buttonSize="sm" onClick={handleGetTeamMemberList} type="button">
                태그하기
              </TextButton>
            </div>
          </div>
          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {/* data map돌리고 싶은데 배열이 아닌것 같음. 얘기해서 배열로 바꿔줄수 있는지 여쭤보기 */}
            <ModalMemberList formTextSize={formTextSize} />
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          수정하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
