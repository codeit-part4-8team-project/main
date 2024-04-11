import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { group } from 'console';
import TextButton from '@/components/common/TextButton';
import GroupList from '@/components/common/modal/GroupList';
import ModalCalendar from '@/components/common/modal/ModalCalendar';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { useUserContext } from '@/contexts/UserProvider';
import { defaultInstance, useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';
import arrowDown from '@/assets/assets/arrow-down-dark.png';
import calender from '@/assets/assets/calendar-dark.svg';

interface IssuesModalProps {
  closeClick: () => void;
  teamId?: number;
  team?: Team;
  onModalDateClick?: (date: string) => void;
}

interface Inputs {
  title: string;
  content: string;
  dueDate: string;
  status: string;
  assignedMembersUsernames: string[];
}

interface memberDataType {
  name: string;
  imageUrl: string;
  role: string;
  grade: string;
  username: string;
  createDate: string;
}

interface groupDataType {
  id: string;
  name: string;
  description: string;
  color: string;
}
// team 나중에 프롭으로 받아야함

export default function IssuesModal({
  closeClick,
  teamId,
  onModalDateClick,
  team,
}: IssuesModalProps) {
  const { fetchData } = useAxios({}); // POST axios
  const { user } = useUserContext();
  const dueDateToggleRef = useRef<HTMLDivElement | null>(null);
  const [dueDateToggle, setDueDateToggle] = useState(false);
  const [membersList, setMembersList] = useState<memberDataType[]>([]);
  const [memberCheck, setMemberCheck] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [groupClickData, setGroupClickData] = useState<groupDataType | null>(null);
  console.log(groupClickData?.id);
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');

  const { register, watch, handleSubmit, getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ title, content }, event) => {
    const createIssue = {
      title: title,
      content: content,
      dueDate: selectedEndDate,
      status: 'TODO',
      assignedMembersUsernames: membersList.map((member) => member.username),
    };

    try {
      await handlePostIssues(createIssue);
      event?.target.closest('dialog').close();
    } catch (error) {
      console.log(error);
    }
  };

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleDueDateClick = () => {
    setDueDateToggle(true);
  };

  const handlePostIssues = (data: Inputs) => {
    if (teamId) {
      fetchData({
        newPath: `issue/${teamId}`,
        newMethod: 'POST',
        newData: data,
      }).then(() => window.location.reload());
    } else if (groupClickData?.id) {
      fetchData({
        newPath: `issue/${groupClickData.id}`,
        newMethod: 'POST',
        newData: data,
      }).then(() => window.location.reload());
    }
  };

  const handleGetTeamMemberList = async () => {
    const userName = getValues('assignedMembersUsernames');
    const res = await defaultInstance.get(
      `member/${groupClickData?.id}/search?username=${userName}`,
    );
    if (res.data) {
      const newMember = res.data;
      setMemberCheck(false);
      setMembersList((prevMembers) => [...prevMembers, ...newMember]);
    } else if (res.data === '') {
      setMemberCheck(true);
    }
  };

  const handleRemoveMember = (userName: string | undefined) => {
    setMembersList((prevMembers) => prevMembers.filter((member) => member.username !== userName));
  };

  const handleGroupClick = () => {
    setGroupList(!groupList);
  };

  const handleGroupId = (data: groupDataType) => {
    setGroupClickData(data);
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

  const handleDateClick = (date: string) => {
    setSelectedEndDate(date);

    if (onModalDateClick) {
      onModalDateClick(selectedEndDate);
    }
  };

  return (
    <ModalLayout title="할 일" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[86.3rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자 (나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img
              src={user?.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
            />
            <p className=" text-[1.4rem]">{user?.name}</p>
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
              value={selectedEndDate}
              onModalDateClick={handleDateClick}
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
                  <ModalCalendar onModalDateClick={handleDateClick} />
                </div>
              )}
            </ModalInput>
          </div>
          <p className={`${formTextSize} mb-[0.8rem]`}>그룹</p>
          {teamId ? (
            <div
              className={`${formTextSize} ${borderStyle} relative w-full px-[1.8rem] py-[1.2rem] `}
            >
              <p>{team?.name}</p>
            </div>
          ) : (
            <div
              className={`${formTextSize} ${borderStyle} relative w-full px-[1.8rem] py-[1.2rem] `}
            >
              {groupClickData ? (
                <div className="flex items-center gap-[3rem]">
                  <p
                    className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
                    style={{ background: groupClickData.color }}
                  ></p>
                  <p className="">{groupClickData.name}</p>
                </div>
              ) : (
                <p className="text-gray50">그룹을 선택해 주세요</p>
              )}

              <button
                className="absolute bottom-0 right-[1.8rem] top-0"
                type="button"
                onClick={handleGroupClick}
              >
                <img src={arrowDown} alt="arrowDown" />
              </button>
              {groupList && <GroupList onClick={handleGroupId} />}
            </div>
          )}
          {/* groupClickData */}
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
              >
                {memberCheck && (
                  <p className="absolute mt-[0.5rem] text-body5-medium text-point_red">
                    검색하신유저가없습니다.
                  </p>
                )}
              </ModalInput>
              <TextButton buttonSize="sm" onClick={handleGetTeamMemberList} type="button">
                태그하기
              </TextButton>
            </div>
          </div>
          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {membersList && (
              <ModalMemberList onClick={handleRemoveMember} memberData={membersList} />
            )}
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
