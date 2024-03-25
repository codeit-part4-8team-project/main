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
import ModalCreateLinkInput from '@/components/common/modal/ModalCreateLinkInput';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import ModalLinkInput from '@/components/Modal/ModalLinkInput';
import ModalUrlToggle from '@/components/Modal/ModalUrlToggle';
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
  members: string[] | null;
  color: string;
  startDate: string;
  endDate: string;
  githubLink?: string | null;
  discordLink?: string | null;
  figmaLink?: string | null;
};

interface dataType {
  bio: string;
  id: number;
  imageUrl: string;
  name: string;
  provider: string;
  username: string;
}

type UserCheck = {
  User: string;
};
interface GroupModalProps {
  closeClick?: () => void;
}

// 남은 작업 members 해결
// date 클릭했을때 값 들어오게끔 + 년도를 계속 올릴수 있게끔
// members 갈색div박스를 도대체 어떻게 해결할건지
export default function GroupModal({ closeClick }: GroupModalProps) {
  const { data, error, fetchData } = useAxios<dataType>({});
  console.log('이값을 넣어야하나?', data);

  const { fetchData: fetchData2 } = useAxios({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
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
      discordLink: data.discordLink,
      figmaLink: data.figmaLink,
      color: data.color,
    };
    handleGrooup(createTeam);
  };

  const colorToggleRef = useRef<HTMLButtonElement | null>(null);
  const oneUrlToggleRef = useRef<HTMLButtonElement | null>(null);
  const twoUrlToggleRef = useRef<HTMLButtonElement | null>(null);
  const threeUrlToggleRef = useRef<HTMLButtonElement | null>(null);
  const startDateToggleRef = useRef<HTMLButtonElement | null>(null);
  const endDateToggleRef = useRef<HTMLButtonElement | null>(null);

  const [colorToggle, setColorToggle] = useState<boolean>(false);
  const [oneUrlToggle, setOneUrlToggle] = useState<boolean>(false);
  const [twoUrlToggle, setTwoUrlToggle] = useState<boolean>(false);
  const [threeUrlToggle, setThreeUrlToggle] = useState<boolean>(false);
  const [startDateToggle, setStartDateToggle] = useState<boolean>(false);
  const [endDateToggle, setEndDateToggle] = useState<boolean>(false);
  const [oneUrlImg, setOneUrlImg] = useState<string | null>(null);
  const [twoUrlImg, setTwoUrlImg] = useState<string | null>(null);
  const [threeUrlImg, setThreeUrlImg] = useState<string | null>(null);
  const [createLinkInput, setCreateLinkInput] = useState<number>(1);
  // 일단 이렇게라도 만들고 나중에 가능하면 수정
  // 왜 어떨때 갑자기 null값이 들어가는지 모르겠음.
  const [oneLinkId, setOneLinkId] = useState<'githubLink' | 'discordLink' | 'figmaLink'>(
    'githubLink',
  );
  const [twoLinkId, setTwoLinkId] = useState<'githubLink' | 'discordLink' | 'figmaLink'>(
    'githubLink',
  );
  const [threeLinkId, setThreeLinkId] = useState<'githubLink' | 'discordLink' | 'figmaLink'>(
    'githubLink',
  );
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  // const testTeamId = 1;
  // const { data, loading, error, fetchData } = useAxios({
  //   path: '/api/team/',
  //   method: 'POST',
  //   data: {},
  // });

  // 왜 안되는거지?
  const handleGrooup = (data: any) => {
    fetchData2({
      newPath: '/team',
      newData: data,
    });
  };

  const handleGetMembers = () => {
    const userName = getValues('members');
    fetchData({
      newPath: `/user/search?username=${userName}`,
    });
    console.log(userName);
  };
  // console.log('fetchDataTest', fetchData);
  // useAxios

  const handleColorClick = (color: string) => {
    setValue('color', color);
    // console.log('color test', color);
  };

  const handleOneUrlClick = () => {
    setOneUrlToggle(!oneUrlToggle);
  };

  const handleTwoUrlClick = () => {
    setTwoUrlToggle(!twoUrlToggle);
  };
  const handleThreeUrlClick = () => {
    setThreeUrlToggle(!threeUrlToggle);
  };

  const handleCreateLinkInput = () => {
    if (createLinkInput === 1) {
      setCreateLinkInput(2);
    } else if (createLinkInput === 2) {
      setCreateLinkInput(3);
    }
  };
  // console.log(createLinkInput);

  const handleOneUrlImgClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const imgSrc = (e.target as HTMLDivElement).getAttribute('data-set');
    let linkId: 'githubLink' | 'discordLink' | 'figmaLink' = 'githubLink';
    const id = (e?.target as HTMLDivElement)?.getAttribute('data-id');

    if (id === 'githubLink' || id === 'discordLink' || id === 'figmaLink') {
      linkId = id;
    }
    setOneUrlImg(imgSrc);
    setOneLinkId(linkId);
  };

  // console.log('1', oneLinkId);

  const handleTwoUrlImgClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const imgSrc = (e.target as HTMLDivElement).getAttribute('data-set');
    let linkId: 'githubLink' | 'discordLink' | 'figmaLink' = 'githubLink';
    const id = (e.target as HTMLDivElement).getAttribute('data-id');
    if (id === 'githubLink' || id === 'discordLink' || id === 'figmaLink') {
      linkId = id;
    }
    setTwoUrlImg(imgSrc);
    setTwoLinkId(linkId);
  };

  // console.log('2', twoLinkId);

  const handleThreeUrlImgClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const imgSrc = (e.target as HTMLDivElement).getAttribute('data-set');
    let linkId: 'githubLink' | 'discordLink' | 'figmaLink' = 'githubLink';
    const id = (e.target as HTMLDivElement).getAttribute('data-id');
    if (id === 'githubLink' || id === 'discordLink' || id === 'figmaLink') {
      linkId = id;
    }
    setThreeUrlImg(imgSrc);
    setThreeLinkId(linkId);
  };
  // console.log('3', threeLinkId);

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };

  const handleColorClickOutside = (e: MouseEvent) => {
    if (colorToggleRef.current && !colorToggleRef.current.contains(e.target as Node)) {
      setColorToggle(false);
    }
  };

  const handleUrlClickOutside = (e: MouseEvent) => {
    if (oneUrlToggleRef.current && !oneUrlToggleRef.current.contains(e.target as Node))
      setOneUrlToggle(false);
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
    if (oneUrlToggle) {
      document.addEventListener('mousedown', handleUrlClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleUrlClickOutside);
    };
  }, [oneUrlToggle]);

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
        <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
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
            startName="startDate"
            endHookform={register('endDate')}
            endName="endDate"
          />
          <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
          <ModalLinkInput
            name={`${oneLinkId}`}
            hookform={register(`${oneLinkId}`)}
            urlToggleRef={oneUrlToggleRef}
            borderStyle={borderStyle}
            inputTextSize={inputTextSize}
            handleUrlClick={handleOneUrlClick}
            urlImg={oneUrlImg}
            github={github}
            discord={discord}
            figma={figma}
            urlToggle={oneUrlToggle}
            handleUrlImgClick={handleOneUrlImgClick}
            arrowDown={arrowDown}
          />
          {createLinkInput >= 2 && (
            <ModalLinkInput
              // name값도 이미지가 바뀔때 되어야하는건데 그렇지 않음
              name={`${twoLinkId}`}
              hookform={register(`${twoLinkId}`)}
              urlToggleRef={twoUrlToggleRef}
              borderStyle={borderStyle}
              inputTextSize={inputTextSize}
              handleUrlClick={handleTwoUrlClick}
              urlImg={twoUrlImg}
              github={github}
              discord={discord}
              figma={figma}
              urlToggle={twoUrlToggle}
              handleUrlImgClick={handleTwoUrlImgClick}
              arrowDown={arrowDown}
            />
          )}
          {createLinkInput === 3 && (
            <>
              <ModalLinkInput
                name={threeLinkId}
                hookform={register(`${threeLinkId}`)}
                urlToggleRef={threeUrlToggleRef}
                borderStyle={borderStyle}
                inputTextSize={inputTextSize}
                handleUrlClick={handleThreeUrlClick}
                urlImg={threeUrlImg}
                github={github}
                discord={discord}
                figma={figma}
                urlToggle={threeUrlToggle}
                handleUrlImgClick={handleThreeUrlImgClick}
                arrowDown={arrowDown}
              />
            </>
          )}

          {createLinkInput < 3 ? (
            <ModalCreateLinkInput onClick={handleCreateLinkInput} />
          ) : (
            <div>사라졌지롱</div>
          )}

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
              <TextButton buttonSize="sm" onClick={handleGetMembers} type="button">
                초대하기
              </TextButton>
            </div>
          </div>

          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {/* data map돌리고 싶은데 배열이 아닌것 같음. 얘기해서 배열로 바꿔줄수 있는지 여쭤보기 */}
            <ModalMemberList formTextSize={formTextSize} data={data} />
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
