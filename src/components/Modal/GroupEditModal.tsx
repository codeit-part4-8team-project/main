import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextButton from '@/components/common/TextButton';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
import ModalColorToggle from '@/components/common/modal/ModalColorToggle';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { Member } from '@/types/teamTypes';
import github from '@/assets/assets/Github.svg';
import arrowDown from '@/assets/assets/arrow-down-dark.png';
import discord from '@/assets/assets/discord.svg';
import figma from '@/assets/assets/figma.svg';

interface Inputs {
  name: string;
  description: string;
  color: string;
  startDate: string;
  endDate: string;
  githubLink: string;
  discordLink: string;
  figmaLink: string;
}

interface DefaultValue {
  color?: string;
  description?: string;
  name?: string;
  members?: Member[];
  startDate?: string;
  endDate?: string;
  githubLink?: string;
  figmaLink?: string;
  discordLink?: string;
}

interface GroupEditModalProps {
  closeClick: () => void;
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
  // teamId?: number;
  // 합칠때 여기도 teamId 프롭에 넣기 에러가 뜸
}
export default function GroupEditModal({
  closeClick,
  onModalStartDateClick,
  onModalEndDateClick,
}: GroupEditModalProps) {
  // 얘네 지우기 합치고나면
  const { teamId } = useParams();
  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');
  // 여기까지
  const { user } = useUserContext();
  const { data: defaultValue } = useAxios<DefaultValue>(
    {
      path: `team/${teamId}`,
    },
    true,
  );
  const {
    color: defaultColor,
    description: defaultDescription,
    name: defaultName,
    startDate: defaultStartDate,
    endDate: defalutEndDate,
    figmaLink: defaultFigmaLink,
    githubLink: defaultGithubLink,
    discordLink: defaultDiscordLink,
    members: defaultMembers,
  }: DefaultValue = defaultValue || {};

  const { fetchData: patchDataFetch } = useAxios<Inputs>({}); // put

  const colorToggleRef = useRef<HTMLButtonElement | null>(null);

  const [colorToggle, setColorToggle] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
      color: defaultColor,
      startDate: defaultStartDate,
      endDate: defalutEndDate,
      githubLink: defaultGithubLink,
      discordLink: defaultDiscordLink,
      figmaLink: defaultFigmaLink,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (
    { name, description, color, startDate, endDate, githubLink, discordLink, figmaLink },
    event,
  ) => {
    const createTeam = {
      name: name,
      description: description,
      color: color,
      startDate: startDate,
      endDate: endDate,
      githubLink: githubLink,
      discordLink: discordLink,
      figmaLink: figmaLink,
    };
    handlePatchGroup(createTeam);
    event?.target.closest('dialog').close();
  };

  const nameWatch = watch('name');
  const descriptionWatch = watch('description');
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

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

  const handlePatchGroup = (data: Inputs) => {
    patchDataFetch({
      newPath: `team/${teamId}`, // 나중에 GET하면 구조분해해서 temaId 가져오기
      newMethod: 'PATCH',
      newData: data,
    });
  };

  useEffect(() => {
    if (colorToggle) {
      document.addEventListener('mousedown', handleColorClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleColorClickOutside);
    };
  }, [colorToggle]);

  useEffect(() => {
    reset();
  }, [defaultValue]);
  //소은
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
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
    <>
      <ModalLayout title="그룹 편집" closeClick={closeClick}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
            <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
            {defaultMembers && defaultMembers.length > 0 && (
              <div className="mb-16 flex items-center gap-4">
                <img
                  src={user?.imageUrl}
                  alt="profile"
                  className="h-[2.4rem] w-[2.4rem] rounded-[99rem]"
                />
                <p className="text-[1.4rem]">{user?.username}</p>
              </div>
            )}

            <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
              <ModalLabel htmlFor="name" label="그룹 이름" className={`${formTextSize}`} />
              <ModalInput
                defaultValue={defaultName}
                name="name"
                id="name"
                hookform={register('name', { maxLength: 20, required: true })}
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
              <ModalLabel htmlFor="description" label="그룹 설명" className={`${formTextSize}`} />
              <ModalInput
                defaultValue={defaultDescription}
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
                <p>20자 이하로 입력해 주세요.</p>
              </div>
            )}
            {descriptionWatch ? (
              <p className=" mb-[0.9rem] flex justify-end text-gray50">
                {descriptionWatch?.length}/40
              </p>
            ) : (
              <p className=" mb-[0.9rem] flex justify-end text-gray50">0/40</p>
            )}
            <div className={`${formTextSize} `}>그룹 컬러 칩</div>
            <div className="mb-12 mt-8 flex items-center gap-12">
              {watch('color') ? (
                <div
                  className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                  style={{ backgroundColor: watch('color') }}
                />
              ) : (
                <div
                  className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                  style={{ backgroundColor: defaultColor }}
                />
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
              startDefaultValue={defaultStartDate}
              endHookform={register('endDate')}
              endName="endDate"
              endDefaultValue={defalutEndDate}
              onModalStartDateClick={handleStartDateClick}
              startValue={selectedStartDate}
              endValue={selectedEndDate}
              onModalEndDateClick={handleEndDateClick}
            />
            <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
            <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.2rem]">
              <img src={github} className={`${borderStyle} px-[1.8rem] py-[1.2rem]`} alt="github" />
              <ModalInput
                defaultValue={defaultGithubLink}
                hookform={register('githubLink')}
                placeholder="URL을 입력해 주세요."
                className={`${inputTextSize} ${borderStyle}`}
                id="link"
                name="githubLink"
              />
            </div>
            <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.2rem]">
              <img
                src={discord}
                className={`${borderStyle} px-[1.8rem] py-[1.2rem]`}
                alt="discord"
              />
              <ModalInput
                defaultValue={defaultDiscordLink}
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
                defaultValue={defaultFigmaLink}
                hookform={register('figmaLink')}
                placeholder="URL을 입력해 주세요."
                className={`${inputTextSize} ${borderStyle}`}
                id="link"
                name="figmaLink"
              />
            </div>
          </ModalFormBorder>
          <TextButton buttonSize="md" className="mt-16">
            편집 완료
          </TextButton>
        </form>
      </ModalLayout>
    </>
  );
}
