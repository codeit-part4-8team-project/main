import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import discord from '../../../public/assets/discord.svg';
import figma from '../../../public/assets/figma.svg';
import profile from '../../../public/profile.svg';
import ModalForm from '../ModalAtuom/ModalForm';
import ModalLabel from '../ModalAtuom/ModalLabel';
import ModalColorToggle from '@/components/common/ModalColorToggle';
import ModalLayout from '@/components/common/ModalLayout';
import ModalInput from '@/components/ModalAtuom/ModalInput';
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
  members: string[];
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
  const [colorToggle, setColorToggle] = useState(false);
  const [urlToggle, setUrlToggle] = useState(false);
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

  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성" size="lg">
      <ModalForm
        watch={watch('name')}
        firstHookform={register('name')}
        secondHookform={register('members')}
        onSubmit={handleSubmit(onSubmit)}
        hidden={true}
        firstLabel="그룹이름"
        firstPlaceholder="그룹 이름을 입력해 주세요."
        firstHtmlForId="name"
        firstName="name"
        firstType="text"
        secondLabel="팀원초대"
        secondPlaceholder="닉네임을 검색해 주세요."
        secondHtmlForId="members"
        secondName="members"
        secondType="text"
        who="그룹 게시자"
        profile={profile}
        userNickName="#userNickName"
      >
        <div className="flex flex-col gap-[0.8rem]">
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
          <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">0/20</p>
        )}
        <div className={`${formTextSize} `}>그룹 컬러 칩</div>
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
        <div className="mb-12 mt-[0.9rem] flex items-center gap-2">
          <ModalInput
            hookform={register('startDate')}
            type="date"
            name="startDate"
            id="date"
            className={`${formTextSize} ${borderStyle}`}
            placeholder="2024년 3월 13일"
          />
          <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
          <ModalInput
            hookform={register('endDate')}
            type="date"
            name="endDate"
            id="date"
            className={`${formTextSize} ${borderStyle}`}
            placeholder="2024년 3월 13일"
          />
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
              <div className="absolute left-0 right-0 top-[5rem] h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-[#FFF] py-[0.4rem] shadow-lg">
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
      </ModalForm>
    </ModalLayout>
  );
}
