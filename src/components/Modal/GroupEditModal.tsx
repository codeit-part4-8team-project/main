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
import { defaultInstance, useAxios } from '@/hooks/useAxios';

// 편집창에서 member 추가할때는 member/${teamId}로 POST 보내기.
// {
//   "name": "string",
//   "description": "string",
//   "color": "string",
//   "startDate": "2024-03-24",
//   "endDate": "2024-03-24",
//   "figma": "string",
//   "github": "string",
//   "discord": "string"
// }
// api 그룹 생성이랑 그룹 편집 코드가 다른데 말씀은 드려야 할것 같다.
// ex) 그룹 생성은 figmaLink: 'string' 인데 수정은 figma:'string'이다.

// default value 형식
// {
//   "id": 0,
//   "name": "string",
//   "description": "string",
//   "color": "string",
//   "members": [
//     {
//       "name": "string",
//       "imageUrl": "string",
//       "role": "string",
//       "grade": "string",
//       "username": "string"
//     }
//   ]
// }

type Inputs = {
  name: string;
  members: string[] | string;
  description: string;
  color: string;
  startDate: string;
  endDate: string;
  githubLink?: string;
  discordLink?: string;
  figmaLink?: string;
};

interface dataType {
  Grade?: string;
  bio: string;
  id: number;
  imageUrl: string;
  name: string;
  provider: string;
  username: string;
}

interface DefaultValue {
  color?: string;
  description?: string;
  name?: string;
  members?: dataType[];
}

interface GroupEditModalProps {
  closeClick: () => void;
}

// color: "#000000"
// description: "description 테스트"
// id: 22
// members: [,…]
// 0: {name: "필겸", imageUrl: "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640",…}
// grade: "OWNER"
// imageUrl: "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640"
// name: "필겸"
// role: null
// username: "user-rjWrbIMhhi"
// name: "name"

export default function GroupEditModal({ closeClick }: GroupEditModalProps) {
  // PUT path = /team/${teamId}
  const teamId = 3;
  const { data: defaultValue } = useAxios(
    {
      path: `team/${teamId}`,
    },
    true,
  );
  console.log('teamId15', defaultValue);
  const { color, description, name, members }: DefaultValue = defaultValue || {};
  const { data: putData, fetchData: putDataFetch } = useAxios<Inputs>({}); // put
  // const { data: datas, error, fetchData: newMembersFetch } = useAxios<dataType>({}); // member POST
  const { fetchData: deleteMembersFetch } = useAxios<dataType>({}); // member POST

  const colorToggleRef = useRef<HTMLButtonElement | null>(null);

  const [colorToggle, setColorToggle] = useState<boolean>(false);
  const [newMembers, setNewMembers] = useState<string[] | string>([]);

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
      color: data.color,
      members: newMembers,
      startDate: data.startDate,
      endDate: data.endDate,
      githubLink: data.githubLink,
      discordLink: data.discordLink,
      figmaLink: data.figmaLink,
    };
    handlePutGroup(createTeam);
    console.log('createTema', createTeam);
  };

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

  const handlePutGroup = (data: Inputs) => {
    putDataFetch({
      newPath: `team/${teamId}`, // 나중에 GET하면 구조분해해서 temaId 가져오기
      newMethod: 'PUT',
      newData: data,
    });
  };
  // 지선님
  // jishanshan
  const handleGetMembers = async () => {
    const userName = getValues('members');
    const newMember = {
      username: userName,
    };
    // newMembersFetch({
    //   newPath: `/member/${teamId}`,
    //   newMethod: 'POST',
    //   newData: newMember,
    // });
    const res = await defaultInstance.post(`/member/${teamId}`, newMember);
    if (res) {
      console.log(res);
      const newMember = res.data;
      setNewMembers((prevMembers) => [...prevMembers, newMember]);
      // if (!error && datas) {
      // setNewMembers(datas.username);
      // }
    }
  };
  // 이거 보니깐 useId를 보내줘야 하던데 클릭으로 하는거니깐 useId없이 그냥 api쏘면 실행되게끔 건의
  const handleDELETMember = () => {
    deleteMembersFetch({
      newPath: `member/${teamId}`,
      newMethod: 'DELETE',
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

  return (
    <>
      <ModalLayout title="그룹 편집" closeClick={closeClick} size="lg">
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
                defaultValue={name}
                name="name"
                id="name"
                hookform={register('name')}
                placeholder="그룹 이름을 입력해 주세요."
                className={`${inputTextSize} ${borderStyle}`}
              />
            </div>
            {watch('name') ? (
              <p className=" mb-[0.9rem] flex justify-end text-gray50">
                {watch('name')?.length}/20
              </p>
            ) : (
              <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
            )}
            <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
              <ModalLabel htmlFor="description" label="그룹 설명" className={`${formTextSize}`} />
              <ModalInput
                defaultValue={description}
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
            <div className={`${formTextSize} `}>그룹 컬러 칩</div>
            <div className="mb-12 mt-8 flex items-center gap-12">
              {/* 여기임 */}
              {watch('color') ? (
                <div
                  className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                  style={{ backgroundColor: watch('color') }}
                />
              ) : (
                <div
                  className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                  style={{ backgroundColor: color }}
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
              endHookform={register('endDate')}
              endName="endDate"
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
              <img
                src={discord}
                className={`${borderStyle} px-[1.8rem] py-[1.2rem]`}
                alt="discord"
              />
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
                />
                <TextButton buttonSize="sm" type="button" onClick={handleGetMembers}>
                  초대하기
                </TextButton>
              </div>
            </div>
            <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
            <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
              <ModalMemberList formTextSize={formTextSize} data={members} />
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
