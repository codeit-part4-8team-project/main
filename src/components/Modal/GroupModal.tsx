import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import calender from '../../../public/assets/calendar-dark.svg';
import discord from '../../../public/assets/discord.svg';
import figma from '../../../public/assets/figma.svg';
import profile from '../../../public/profile.svg';
import ModalCalendar from '../common/modal/ModalCalendar';
import ModalFormBorder from '../common/modal/ModalFormBorder';
import ModalLabel from '../common/modal/ModalLabel';
import ModalMemberList from '../common/modal/ModalMemberList';
import ModalColorToggle from '@/components/common/modal/ModalColorToggle';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';

// {
//   "name": "string",
//   "description": "string", 이건 뭐지?? 물어봐야할듯
//   "color": "string",
//   "startDate": "string",
//   "endDate": "string",
//   "members": [
//     "string"
//   ],
// 여기 굳이 세개로 나눈 이유는? 세개의 데이터가 다 필요한게 아니라는데
// 그렇다면 그냥 "link": 'string'; 하나랑
// linkImg를 따로 받으면 안되나?
// 그리고 만약 3개를 한번에 다 넣고 싶다면 현재 ui가 인풋창이1개인데 3개로 만들어야하나..?
//   "figmaLink": "string", // 이 부분 작업이 좀 헷갈리네
//   "githubLink": "string",
//   "discordLink": "string"
// }

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

// 남은 작업 members 해결
// date 클릭했을때 값 들어오게끔 + 년도를 계속 올릴수 있게끔
// members 갈색div박스를 도대체 어떻게 해결할건지
export default function GroupModal({ closeClick }: GroupModalProps) {
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
  const [colorToggle, setColorToggle] = useState(false);
  const [urlToggle, setUrlToggle] = useState(false);
  const [startDateToggle, setStartDateToggle] = useState(false);
  const [endDateToggle, setEndDateToggle] = useState(false);
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';

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
    <ModalLayout closeClick={closeClick} title="그룹 생성" size="lg">
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
          <div className={`${formTextSize}`}>그룹 컬러 칩</div>
          <div className="mb-12 mt-8 flex items-center gap-12">
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
          <ModalLabel htmlFor="date" label="날짜 (시작-종료)" className={`${formTextSize}`} />
          <div className=" mb-12 mt-[0.9rem] flex items-center gap-2">
            <ModalInput
              hookform={register('startDate')}
              type="text"
              name="startDate"
              id="date"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="YYYY-MM-DD"
            >
              <button
                className="absolute bottom-0 right-[1.8rem] top-0"
                onClick={handleStartDateClick}
                ref={startDateToggleRef}
              >
                <img src={calender} alt="캘린더" />
              </button>
              {startDateToggle && (
                <div className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]">
                  <ModalCalendar />
                </div>
              )}
              {/* box-shadow: 0px 0px 10px 0px rgba(17, 17, 17, 0.05) */}
            </ModalInput>

            <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
            <ModalInput
              hookform={register('endDate')}
              type="text"
              name="endDate"
              id="date"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="YYYY-MM-DD"
            >
              <button
                className="absolute bottom-0 right-[1.8rem] top-0"
                onClick={handleEndDateClick}
                ref={endDateToggleRef}
              >
                <img src={calender} alt="캘린더" />
              </button>
              {endDateToggle && (
                <div className="absolute top-20 z-50 h-[20.1rem] w-[22.5rem] bg-white px-[1.4rem] py-[1.3rem]">
                  <ModalCalendar />
                </div>
              )}
            </ModalInput>
          </div>
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
                <div className="absolute left-0 right-0 top-[5rem] z-50 h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-[#FFF] py-[0.4rem] shadow-lg">
                  <div
                    className="hover:bg-gray10 flex justify-center py-[0.4rem]"
                    onClick={handleUrlImgClick}
                    data-set={github}
                  >
                    <img src={github} alt="깃허브로고" className="px-3.5rem text-center" />
                  </div>
                  <div
                    className="hover:bg-gray10 flex  justify-center py-[0.4rem]"
                    onClick={handleUrlImgClick}
                    data-set={discord}
                  >
                    <img src={discord} alt="디스코드로고" />
                  </div>
                  <div
                    className="hover:bg-gray10 flex  justify-center py-[0.4rem]"
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
        {/* <button></button> 채빈님 버튼 넣기 */}
      </form>
    </ModalLayout>
  );
}
