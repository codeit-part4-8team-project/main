import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import discord from '../../../public/assets/discord.svg';
import figma from '../../../public/assets/figma.svg';
import profile from '../../../public/profile.svg';
import ModalCalendarInput from '../common/modal/ModalCalendarInput';
import ModalFormBorder from '../common/modal/ModalFormBorder';
import ModalMemberList from '../common/modal/ModalMemberList';
import ModalColorToggle from '@/components/common/modal/ModalColorToggle';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';

type Inputs = {
  name: string;
  description: string;
  members: string[];
  color: string;
  startDate: string;
  endDate: string;
  githubLink: string;
};

interface GroupEditModalProps {
  closeClick: () => void;
}

export default function GroupEditModal({ closeClick }: GroupEditModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createTeam = {
      name: data.name,
      description: data.description,
      members: [data?.members],
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
  const [colorToggle, setColorToggle] = useState(false);
  const [urlToggle, setUrlToggle] = useState(false);
  const [startDateToggle, setStartDateToggle] = useState(false);
  const [endDateToggle, setEndDateToggle] = useState(false);
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const handleColorClick = (color: string) => {
    setValue('color', color);
  };

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
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

  const handleUrlImgClick: MouseEventHandler<HTMLImageElement> = (e) => {
    console.log('tttt', e.currentTarget);
    setUrlImg(e.currentTarget.src);
  };

  const handleColorClickOutside = (e: MouseEvent) => {
    if (colorToggleRef.current && !colorToggleRef.current.contains(e.target as Node)) {
      setColorToggle(false);
    }
  };

  const handleUrlClickOutside = (e: MouseEvent) => {
    if (urlToggleRef.current && !urlToggleRef.current.contains(e.target as Node)) {
      setUrlToggle(false);
    }
  };

  const handleStartDateClickOutside = (e: MouseEvent) => {
    if (startDateToggleRef.current && !startDateToggleRef.current.contains(e.target as Node))
      setStartDateToggle(false);
  };
  const handleEndDateClickOutside = (e: MouseEvent) => {
    if (endDateToggleRef.current && !endDateToggleRef.current.contains(e.target as Node))
      setEndDateToggle(false);
  };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // 폼 기본 동작 방지
  //   // 나머지 로직 추가
  // };

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
    <>
      <ModalLayout title="그룹 편집" closeClick={closeClick}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalFormBorder className="mt-16 h-[96.3rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5] px-12 pt-12">
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
                hookform={register('name')}
                placeholder="그룹 이름을 입력해 주세요."
                className={`${formTextSize}${borderStyle}`}
              />
            </div>
            {watch('name') ? (
              <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">
                {watch('name')?.length}/20
              </p>
            ) : (
              <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">0/20</p>
            )}
            <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
              <ModalLabel htmlFor="description" label="그룹 설명" className={`${formTextSize}`} />
              <ModalInput
                id="description"
                type="text"
                placeholder="그룹 설명을 입력해 주세요."
                className={`${formTextSize}${borderStyle}`}
                name="description"
                hookform={register('description')}
              />
            </div>
            {watch('description') ? (
              <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">
                {watch('description')?.length}/40
              </p>
            ) : (
              <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">0/40</p>
            )}
            <div className={`${formTextSize} `}>그룹 컬러 칩</div>
            <div className="mb-12 mt-8 flex items-center gap-12">
              {/* 여기임 */}
              {watch('color') ? (
                <div
                  className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                  style={{ backgroundColor: watch('color') }}
                />
              ) : (
                <div className={`h-[4.7rem] w-[4.7rem] rounded-[50%] bg-[#F7F7F7]`} />
              )}

              <button
                onClick={handleColorToggle}
                type="button"
                className="relative w-[10rem]"
                ref={colorToggleRef}
              >
                <div
                  className={`${borderStyle} flex cursor-pointer items-center justify-center gap-[0.4rem] px-4 py-[1.2rem] text-xl font-bold`}
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
                  <img src={urlImg} alt="깃허브로고" />
                )}
                <img src={arrowDown} alt="토글버튼" />
                {urlToggle && (
                  // 나중에 컴포넌트로 분리
                  <div className="absolute left-0 right-0 top-[5rem] h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-[#FFF] py-[0.4rem] shadow-lg">
                    <div className="flex justify-center py-[0.4rem]">
                      <img
                        src={github}
                        alt="깃허브로고"
                        onClick={handleUrlImgClick}
                        className="px-3.5rem text-center"
                      />
                    </div>
                    <div className="flex justify-center  py-[0.4rem]">
                      <img src={discord} alt="디스코드로고" onClick={handleUrlImgClick} />
                    </div>
                    <div className="flex justify-center  py-[0.4rem]">
                      <img src={figma} alt="피그마로고" onClick={handleUrlImgClick} />
                    </div>
                  </div>
                  // 여기까지
                )}
              </button>

              <ModalInput
                id="link"
                className={`${formTextSize} ${borderStyle}`}
                placeholder="URL을 입력해 주세요."
              />
            </div>
            <div className=" flex flex-col gap-[0.8rem]">
              <ModalLabel label="팀원 초대" className={`${formTextSize}`} htmlFor="members" />
              <div className="flex items-center gap-[1.2rem]">
                <ModalInput
                  name="members"
                  // hookform={register('members')}
                  type="text"
                  placeholder="닉네임을 검색해 주세요."
                  id="mebers"
                  className={`${formTextSize} ${borderStyle} `}
                />
                <button>
                  <div className="flex h-[4.6rem] w-[8.7rem] items-center justify-center rounded-[0.6rem] border bg-[#292929] font-bold text-[#FFF]">
                    초대하기
                  </div>
                </button>
              </div>
            </div>
            <ModalMemberList formTextSize={formTextSize} />
          </ModalFormBorder>
        </form>
      </ModalLayout>
    </>
  );
}
