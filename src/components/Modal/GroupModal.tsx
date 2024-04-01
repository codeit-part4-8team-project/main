import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import discord from '../../../public/assets/discord.svg';
import figma from '../../../public/assets/figma.svg';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
import ModalColorToggle from '@/components/common/modal/ModalColorToggle';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { defaultInstance, useAxios } from '@/hooks/useAxios';

type Inputs = {
  name: string;
  description: string;
  // members: string[] | null;
  color: string;
  startDate: string;
  endDate: string;
  githubLink: string;
};

interface GroupModalProps {
  closeClick?: () => void;
}

export default function GroupModal({ closeClick }: GroupModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    description,
    startDate,
    endDate,
    githubLink,
    discordLink,
    figmaLink,
    color,
  }) => {
    const createTeam = {
      name: data.name,
      description: data.description,
      // members: [data?.members],
      startDate: data.startDate,
      endDate: data.endDate,
      githubLink: data.githubLink,
      color: data.color,
    };
    console.log('createTema', createTeam);
  };

  const colorToggleRef = useRef<HTMLButtonElement | null>(null);
  const urlToggleRef = useRef<HTMLButtonElement | null>(null);
  const startDateToggleRef = useRef<HTMLButtonElement | null>(null);
  const endDateToggleRef = useRef<HTMLButtonElement | null>(null);
  const [colorToggle, setColorToggle] = useState<boolean>(false);
  const [urlToggle, setUrlToggle] = useState<boolean>(false);
  const [startDateToggle, setStartDateToggle] = useState<boolean>(false);
  const [endDateToggle, setEndDateToggle] = useState<boolean>(false);
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const formTextSize = 'body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  // const testTeamId = 1;
  // const { data, loading, error, fetchData } = useAxios({
  //   path: `/api/member/${testTeamId}`,
  //   method: 'GET',
  //   data: {},
  // });
  // console.log('axiosFetchData', fetchData);
  // console.log('axiosData', data);

  const handleColorClick = (color: string) => {
    setValue('color', color);
    console.log('color test', color);
  };

  const handleUrlClick = () => {
    setUrlToggle(!urlToggle);
  };
  const handleStartDateClick = () => {
    setStartDateToggle(!startDateToggle);
  };
  const handleEndDateClick = () => {
    setEndDateToggle(!endDateToggle);
  };

  const handleUrlImgClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const imgSrc = (e.target as HTMLDivElement).getAttribute('data-set');
    console.log('tttt', imgSrc);
    setUrlImg(imgSrc);
  };

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };

  const handleColorClickOutside = (e: MouseEvent) => {
    if (colorToggleRef.current && !colorToggleRef.current.contains(e.target as Node)) {
      setColorToggle(false);
    }
  };

  const handleUrlClickOutside = (e: MouseEvent) => {
    if (urlToggleRef.current && !urlToggleRef.current.contains(e.target as Node))
      setUrlToggle(false);
  };

  const handleStartDateClickOutside = (e: MouseEvent) => {
    if (startDateToggleRef.current && !startDateToggleRef.current.contains(e.target as Node))
      setStartDateToggle(false);
  };
  const handleEndDateClickOutside = (e: MouseEvent) => {
    if (endDateToggleRef.current && !endDateToggleRef.current.contains(e.target as Node))
      setEndDateToggle(false);
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
    if (urlToggle) {
      document.addEventListener('mousedown', handleUrlClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleUrlClickOutside);
    };
  }, [urlToggle]);

  useEffect(() => {
    if (startDateToggle) {
      document.addEventListener('mousedown', handleStartDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleStartDateClickOutside);
    };
  }, [startDateToggle]);

  useEffect(() => {
    if (endDateToggle) {
      document.addEventListener('mousedown', handleEndDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleEndDateClickOutside);
    };
  }, [endDateToggle]);

  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성" size="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[96.3rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
            {/*  */}
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="name" label="그룹 이름" className={`${formTextSize}`} />
            <ModalInput
              name="name"
              id="name"
              hookform={register('name', { required: true, maxLength: 20 })}
              placeholder="그룹 이름을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {watch('name') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('name')?.length}/20</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
          )}
          <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="description" label="그룹 설명" className={`${formTextSize}`} />
            <ModalInput
              id="description"
              type="text"
              placeholder="그룹 설명을 입력해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
              name="description"
              hookform={register('description')}
            />
          </div>
          {watch('description') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">
              {watch('description')?.length}/40
            </p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/40</p>
          )}
          <div className={`${formTextSize}`}>그룹 컬러 칩</div>
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
            endHookform={register('endDate')}
          />
          <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
          <div className="mb-12 mt-[1.6rem] flex gap-[1.6rem]">
            <button
              ref={urlToggleRef}
              className={`${borderStyle} relative flex  items-center justify-center gap-[0.4rem] px-[1.8rem] py-[1.2rem]`}
              onClick={handleUrlClick}
            >
              {urlImg === null ? (
                <img src={github} alt="깃허브로고" />
              ) : (
                <img src={urlImg} alt="로고" />
              )}
              <img src={arrowDown} alt="토글버튼" />
              {urlToggle && (
                // 나중에 컴포넌트로 분리
                <div className="absolute left-0 right-0 top-[5rem] z-50 h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-white py-[0.4rem] shadow-lg">
                  <div
                    className="flex justify-center py-[0.4rem] hover:bg-gray10"
                    onClick={handleUrlImgClick}
                    data-set={github}
                  >
                    <img src={github} alt="깃허브로고" className="px-3.5rem text-center" />
                  </div>
                  <div
                    className="flex justify-center  py-[0.4rem] hover:bg-gray10"
                    onClick={handleUrlImgClick}
                    data-set={discord}
                  >
                    <img src={discord} alt="디스코드로고" />
                  </div>
                  <div
                    className="flex justify-center  py-[0.4rem] hover:bg-gray10"
                    onClick={handleUrlImgClick}
                    data-set={figma}
                  >
                    <img src={figma} alt="피그마로고" />
                  </div>
                </div>
                // 여기까지
              )}
            </button>
            <ModalInput
              hookform={register('githubLink')}
              name="githubLink"
              id="link"
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="URL을 입력해 주세요."
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
              />
              <TextButton buttonSize="sm">초대하기</TextButton>
            </div>
          </div>
          <ModalMemberList formTextSize={formTextSize} />
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
