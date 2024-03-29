import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalCalendar from '@/components/common/modal/ModalCalendar';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { defaultInstance, useAxios } from '@/hooks/useAxios';

interface IssuesModalProps {
  closeClick: () => void;
}

type Inputs = {
  title: string;
  content: string;
  dueDate: string;
  assignedMembersUsernames: string[];
};

interface memberDataType {
  name: string;
  imageUrl: string;
  role: string;
  grade: string;
  username: string;
  createDate: string;
}

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

  const dueDateToggleRef = useRef<HTMLDivElement | null>(null);
  const [dueDateToggle, setDueDateToggle] = useState(false);
  // 여기 작업 조금 남았음
  const [membersList, setMembersList] = useState<memberDataType[]>([]);
  console.log('membersList Test', membersList);
  const [memberCheck, setMemberCheck] = useState(false);

  const { register, watch, handleSubmit, getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createIssue = {
      title: data.title,
      content: data.content,
      dueDate: data.dueDate,
      assignedMembersUsernames: [data.assignedMembersUsernames], // 나중에 배열 타입문제 해결하기
    };
    handlePostIssues(createIssue);
    // console.log(createIssue);
  };
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleDueDateClick = () => {
    setDueDateToggle(true);
  };

  const teamId = 10;

  const handlePostIssues = (data: Inputs) => {
    fetchData({
      newPath: `issue/${teamId}`,
      newMethod: 'POST',
      newData: data,
    });
  };

  const handleGetTeamMemberList = async () => {
    const userName = getValues('assignedMembersUsernames');
    const res = await defaultInstance.get(`member/${teamId}/search?username=${userName}`);
    // console.log('여여', typeof res);
    if (res.data !== '') {
      const newMember = res.data;
      setMemberCheck(false);
      setMembersList((prevMembers) => [...prevMembers, newMember]);
    } else if (res.data === '') {
      setMemberCheck(true);
    }
  };

  const handleRemoveMember = (userName: string | undefined) => {
    setMembersList((prevMembers) => prevMembers.filter((member) => member.username !== userName));
  };

  const handleDueDateClickOutside = (e: MouseEvent) => {
    if (!dueDateToggleRef.current?.contains(e.target as Node)) setDueDateToggle(false);
  };
  useEffect(() => {
    if (dueDateToggleRef) {
      document.addEventListener('mousedown', handleDueDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleDueDateClickOutside);
    };
  }, [dueDateToggle]);
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
          <div className="mb-[3.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="dueDate" label="날짜 (마감일)" className={`${formTextSize}`} />
            <ModalInput
              hookform={register('dueDate')}
              type="text"
              name="dueDate"
              id="dueDate"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="날짜를 설정해 주세요."
            >
              <button
                className="absolute bottom-0 right-[1.8rem] top-0"
                onClick={handleDueDateClick}
                type="button"
              >
                <img src={calender} alt="캘린더" />
              </button>
              {dueDateToggle && (
                <div
                  className=" absolute right-0 top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem] shadow-[0_0_10px_0_rgba(17,17,17,0.05)]"
                  ref={dueDateToggleRef}
                >
                  <ModalCalendar />
                </div>
              )}
            </ModalInput>
          </div>

          <ModalLabel htmlFor="group" label="그룹" className={`${formTextSize}`} />
          <ModalInput
            id="group"
            name="group"
            placeholder="그룹을 선택해 주세요"
            className={`${formTextSize} ${borderStyle} `}
          >
            <button
              className="absolute bottom-0 right-[1.8rem] top-0"
              // onClick={handleStartDateClick}
              type="button"
            >
              <img src={arrowDown} alt="arrowDown" />
            </button>
          </ModalInput>
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel
              label="팀원 태그"
              className={`${formTextSize} mt-[3.8rem]`}
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
            <ModalMemberList formTextSize={formTextSize} onClick={handleRemoveMember} />
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
