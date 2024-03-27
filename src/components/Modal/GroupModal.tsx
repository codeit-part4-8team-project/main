import { useEffect, useRef, useState } from 'react';
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
  // members: string[];
  color: string;
  startDate: string;
  endDate: string;
  githubLink?: string;
  discordLink?: string;
  figmaLink?: string;
};

interface dataType {
  bio: string;
  id: number;
  imageUrl: string;
  name: string;
  provider: string;
  username: string;
}

interface GroupModalProps {
  closeClick?: () => void;
}

// 남은 작업 members 해결
// date 클릭했을때 값 들어오게끔 + 년도를 계속 올릴수 있게끔
// members 갈색div박스를 도대체 어떻게 해결할건지
export default function GroupModal({ closeClick }: GroupModalProps) {
  const { data: datas, error, fetchData } = useAxios<dataType>({});
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
      // members: [datas],
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
  const [colorToggle, setColorToggle] = useState<boolean>(false);

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  // 왜 안되는거지?
  const handleGrooup = (data: Inputs) => {
    fetchData2({
      newPath: '/team/',
      newMethod: 'POST',
      newData: data,
    });
  };

  // const handleGetMembers = () => {
  //   const userName = getValues('members');
  //   fetchData({
  //     newPath: `/user/search?username=${userName}`,
  //   });
  // };

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

  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성" size="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="name" label="그룹 이름*" className={`${formTextSize}`} />
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
          {watch('description') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">
              {watch('description')?.length}/40
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
          />
          <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />

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
                // hookform={register('members')}
                type="text"
                placeholder="닉네임을 검색해 주세요."
                id="mebers"
                className={`${inputTextSize} ${borderStyle} `}
              />
              {/* <TextButton buttonSize="sm" onClick={handleGetMembers} type="button"> */}
              초대하기
              {/* </TextButton> */}
            </div>
          </div>

          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {/* 검색했을때의 값을 하나씩 가져옮. 그렇다면 어떻게 만들어야 계속해서 추가가 가능하지? */}
            {datas && <ModalMemberList formTextSize={formTextSize} data={datas} />}
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          생성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
