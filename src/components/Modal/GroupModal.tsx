import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import profile from '../../../public/profile.svg';
import ModalForm from '../ModalAtuom/ModalForm';
import ModalLabel from '../ModalAtuom/ModalLabel';
import ModalColorToggle from '@/components/common/ModalColorToggle';
import ModalLayout from '@/components/common/ModalLayout';
import ModalInput from '@/components/ModalAtuom/ModalInput';

type Inputs = {
  name: string;
  invite: string;
  startDate: string;
  endDate: string;
  githubLink: string;
};

interface GroupModalProps {
  closeClick?: () => void;
}
function GroupModal({ closeClick }: GroupModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createTeam = {
      name: data.name,
      invite: data.invite,
      startDate: data.startDate,
      endDate: data.endDate,
      githubLink: data.githubLink,
    };
    console.log(createTeam);
  };
  // {
  //   "name": "string",
  //   "description": "string", 이건 뭐지?? 물어봐야할듯
  //   "color": "string",
  //   "startDate": "string",
  //   "endDate": "string",
  //   "members": [
  //     "string"
  //   ],
  //   "figmaLink": "string",
  //   "githubLink": "string",
  //   "discordLink": "string"
  // }
  // console.log('여기', data);

  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const [color, setColor] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleColorClick = (color: string) => {
    setColor(color);
  };
  console.log(color);
  const inputVlaue = (e: any) => {
    console.log(e.target);
  };

  const handlePreventDefault = (e: any) => {
    e.preventDefault();
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  console.log('groupModal');
  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성" size="lg">
      <ModalForm
        firstHookform={register('name')}
        secondHookform={register('invite')}
        onSubmit={handleSubmit(onSubmit)}
        hidden={true}
        firstLabel="그룹이름"
        firstPlaceholder="그룹 이름을 입력해 주세요."
        firstHtmlForId="name"
        firstName="name"
        firstType="text"
        secondLabel="팀원초대"
        secondPlaceholder="닉네임을 검색해 주세요."
        secondHtmlForId="invite"
        secondName="invite"
        secondType="text"
        who="그룹 게시자"
        profile={profile}
        userNickName="#userNickName"
      >
        <div className={`${formTextSize} `}>그룹 컬러 칩</div>
        <div className="mb-12 mt-8 flex items-center gap-12">
          {/* 여기임 */}
          {color ? (
            <div
              className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
              style={{ backgroundColor: color }}
            />
          ) : (
            <div className={`h-[4.7rem] w-[4.7rem] rounded-[50%] bg-[#F7F7F7]`} />
          )}

          <button onClick={handleToggle} type="button" className="relative w-[10rem]">
            <div
              className={`${borderStyle} flex cursor-pointer items-center justify-center gap-[0.4rem] px-4 py-[1.2rem] text-xl font-bold`}
            >
              컬러 설정
              <img alt="토글버튼" src={arrowDown} />
            </div>
            {toggle && <ModalColorToggle handleColorClick={handleColorClick} />}
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
            value={inputVlaue}
          />
        </div>
        <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
        <div className="mb-12 mt-[1.6rem] flex gap-[1.6rem]">
          <button className={`${borderStyle} flex items-center px-[1.8rem] pl-[1.2rem]`}>
            <img src={github} alt="깃허브로고" />
            <img src={arrowDown} alt="토글버튼" />
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
export default GroupModal;
