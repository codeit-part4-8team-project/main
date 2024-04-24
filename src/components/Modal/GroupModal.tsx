import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
import ModalColorToggle from '@/components/common/modal/ModalColorToggle';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { useUserContext } from '@/contexts/UserProvider';
import { defaultInstance, useAxios } from '@/hooks/useAxios';
import github from '@/assets/assets/Github.svg';
import arrowDown from '@/assets/assets/arrow-down-dark.png';
import discord from '@/assets/assets/discord.svg';
import figma from '@/assets/assets/figma.svg';

export interface Inputs {
  name: string;
  description: string;
  members?: string[];
  color: string;
  startDate: string;
  endDate: string;
  githubLink?: string;
  discordLink?: string;
  figmaLink?: string;
}

export interface dataType {
  bio: string;
  id: number;
  imageUrl: string;
  name: string;
  provider: string;
  username: string;
}

interface GroupModalProps {
  closeClick?: () => void;
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
}

export default function GroupModal({
  closeClick,
  onModalStartDateClick,
  onModalEndDateClick,
}: GroupModalProps) {
  const { fetchData: groupFetch } = useAxios({});
  const { user } = useUserContext();

  const colorToggleRef = useRef<HTMLButtonElement | null>(null);
  const [colorToggle, setColorToggle] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [membersList, setMembersList] = useState<dataType[]>([]);
  const [memberCheck, setMemberCheck] = useState(false);

  const { register, handleSubmit, watch, setValue, getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (
    { name, description, githubLink, discordLink, figmaLink, color },
    event,
  ) => {
    const createTeam = {
      name: name,
      description: description,
      members: membersList.map((member) => member.username),
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      githubLink: githubLink,
      discordLink: discordLink,
      figmaLink: figmaLink,
      color: color || '#7563E1',
    };

    try {
      handleGroup(createTeam);
      event?.target.closest('dialog').close();
    } catch (error) {
      console.log(error);
    }
  };
  const nameWatch = watch('name');
  const descriptionWatch = watch('description');

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleGroup = (data: Inputs) => {
    groupFetch({
      newPath: '/team/',
      newMethod: 'POST',
      newData: data,
    }).then(() => window.location.reload());
  };

  const handleGetMembers = async () => {
    const userName = getValues('members');
    const res = await defaultInstance.get(`/user/search?username=${userName}`);
    if (res.data !== '') {
      const newMember = res.data;
      // 새로운 팀원을 기존 팀원 목록에 추가
      setMemberCheck(false);
      setMembersList((prevMembers) => [...prevMembers, newMember]);
    } else if (res.data === '') {
      setMemberCheck(true);
    }
  };

  const handleRemoveMember = (userName: string | undefined) => {
    setMembersList((prevMembers) => prevMembers.filter((member) => member.username !== userName));
  };

  const handleColorClick = (color: string) => {
    setValue('color', color);
  };

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };

  const handleColorClickOutside = (e: MouseEvent) => {
    if (colorToggleRef.current && !colorToggleRef.current.contains(e.target as Node)) {
      setColorToggle(false);
    }
  };

  useEffect(() => {
    if (colorToggle) {
      document.addEventListener('mousedown', handleColorClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleColorClickOutside);
    };
  }, [colorToggle]);

  const handleStartDateClick = (date: string) => {
    setSelectedStartDate(date);
    if (onModalStartDateClick) {
      onModalStartDateClick(date);
    }
  };
  const handleEndDateClick = (date: string) => {
    setSelectedEndDate(date);

    if (onModalEndDateClick) {
      onModalEndDateClick(date);
    }
  };
  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
          <div className="mb-16 flex items-center gap-4">
            <img
              src={user?.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[99rem]"
            />
            <p className=" text-[1.4rem]">{user?.name}</p>
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="name" label="그룹 이름*" className={`${formTextSize}`} />
            <ModalInput
              name="name"
              id="name"
              hookform={register('name', { required: true, maxLength: 20 })}
              placeholder="그룹 이름을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {nameWatch?.length > 20 && (
            <div className="absolute text-point_red">
              <p>20자 이하로 입력해 주세요.</p>
            </div>
          )}
          {nameWatch ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{nameWatch?.length}/20</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
          )}
          <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="description" label="그룹 설명*" className={`${formTextSize}`} />
            <ModalInput
              id="description"
              type="text"
              placeholder="그룹 설명을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
              name="description"
              hookform={register('description')}
            />
          </div>
          {descriptionWatch?.length > 40 && (
            <div className="absolute text-point_red">
              <p>40자 이하로 입력해 주세요.</p>
            </div>
          )}
          {descriptionWatch ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">
              {descriptionWatch?.length}/40
            </p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/40</p>
          )}
          <div className={`${formTextSize}`}>그룹 컬러 칩*</div>
          <div className="mb-12 mt-8 flex items-center gap-12">
            {watch('color') ? (
              <div
                className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                style={{ backgroundColor: watch('color') }}
              />
            ) : (
              <div className={`h-[4.7rem] w-[4.7rem] rounded-[50%] bg-gray10`} />
            )}

            <button
              onClick={handleColorToggle}
              type="button"
              className="relative w-[10rem]"
              ref={colorToggleRef}
            >
              <div
                className={`${borderStyle} flex cursor-pointer items-center justify-center gap-[0.4rem] px-4 py-[1.2rem] text-body4-bold`}
              >
                컬러 설정
                <img alt="토글버튼" src={arrowDown} />
              </div>
              {colorToggle && <ModalColorToggle handleColorClick={handleColorClick} />}
            </button>
          </div>
          <ModalCalendarInput
            startHookform={register('startDate')}
            startName="startDate"
            endHookform={register('endDate')}
            endName="endDate"
            onModalStartDateClick={handleStartDateClick}
            startValue={selectedStartDate}
            endValue={selectedEndDate}
            onModalEndDateClick={handleEndDateClick}
          />
          <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
          <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.2rem]">
            <img src={github} className={`${borderStyle} px-[1.8rem] py-[1.2rem]`} alt="github" />
            <ModalInput
              hookform={register('githubLink')}
              placeholder="URL을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
              id="link"
              name="githubLink"
            />
          </div>
          <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.2rem]">
            <img src={discord} className={`${borderStyle} px-[1.8rem] py-[1.2rem]`} alt="discord" />
            <ModalInput
              hookform={register('discordLink')}
              placeholder="URL을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
              id="link"
              name="discordLink"
            />
          </div>
          <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.2rem]">
            <img src={figma} className={`${borderStyle} px-[1.8rem] py-[1.2rem]`} alt="figma" />
            <ModalInput
              hookform={register('figmaLink')}
              placeholder="URL을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
              id="link"
              name="figmaLink"
            />
          </div>
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel label="팀원 초대" className={`${formTextSize}`} htmlFor="members" />
            <div className="flex items-center gap-[1.2rem]">
              <ModalInput
                name="members"
                hookform={register('members')}
                type="text"
                placeholder="닉네임을 검색해 주세요."
                id="mebers"
                className={`${inputTextSize} ${borderStyle} `}
              >
                {memberCheck && (
                  <p className="absolute mt-[0.5rem] text-body5-medium text-point_red">
                    검색하신유저가없습니다.
                  </p>
                )}
              </ModalInput>
              <TextButton buttonSize="sm" onClick={handleGetMembers} type="button">
                검색하기
              </TextButton>
            </div>
          </div>

          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full overflow-scroll rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
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
