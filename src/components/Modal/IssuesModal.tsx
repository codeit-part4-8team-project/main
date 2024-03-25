import { SubmitHandler, useForm } from 'react-hook-form';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
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
// 여기 이슈모달에 시간값 있던데 이건 어떻게 할건지? 의논 필요
// api는 dueDate만 있는데 ui에는 start,due(end) 두개가 있음 의논 필요

// {
//   "title": "string",
//   "content": "string",
//   "dueDate": "2024-03-24",
//   "status": "TODO", -> 기본값 TODO고정 값 안 보내도됨.
// 이슈 생성 제목은 ‘할 일'만 생성가능
// : 드레그로 칸반보드 움직일 수 있기 때문에
// ‘진행중'과 '백로그'는 무의미합니다! 이게 상태 얘기하는것 같다
//   "assignedMembersUsernames": [
//     "string"
//   ]
// }
export default function IssuesModal({ closeClick }: IssuesModalProps) {
  const { fetchData: memberFetchData } = useAxios({}); // member tag GET axios
  const { fetchData } = useAxios({}); // POST axios
  const { register, watch, handleSubmit, getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createIssue = {
      title: data.title,
      content: data.content,
      assignedMembersUsernames: data.assignedMembersUsernames, // 나중에 배열 타입문제 해결하기
    };

    handlePostIssues(createIssue);
    console.log(createIssue);
  };

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handlePostIssues = (data: Inputs) => {
    fetchData({
      newPath: `${teamsId}/issue`,
      newMethod: 'POST',
      newData: data,
    });
  };

  const handleGetTeamMemberList = () => {
    const userName = getValues('assignedMembersUsernames');
    memberFetchData({
      newPath: `member/${teamsId}/search?username=${userName}`,
    });
  };
  // member/12/search?username=12

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
        <ModalFormBorder className="mt-16 h-[86.3rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
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
          <ModalCalendarInput />
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
            {/* 값이 only 1개이니까 배열 안 만들고 그냥 초대하기 눌렸을때 하나, 검색시 === 값 하나 */}
            <ModalMemberList formTextSize={formTextSize} />
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
