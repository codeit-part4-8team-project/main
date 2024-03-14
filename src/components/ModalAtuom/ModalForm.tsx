import { ChangeEvent, ReactNode, useState } from 'react';
import clsx from 'clsx';
import ModalInput from '../ModalAtuom/ModalInput';
import ModalLabel from '../ModalAtuom/ModalLabel';
import ModalMemberList from './ModalMemberList';

interface ModalFormProps {
  children?: ReactNode;
  who: string;
  profile: string;
  userNickName: string;
  firstLabel?: string;
  firstPlaceholder?: string;
  secondLabel?: string;
  secondPlaceholder?: string;
  firstHtmlForId: string;
  secondHtmlForId: string;
  hidden?: boolean;
  firstType: string;
  secondType: string;
  onSubmit?: any;
  firstHookform?: any;
  secondHookform?: any;
  firstName?: string;
  secondName?: string;
}

function ModalForm({
  who,
  profile,
  userNickName,
  firstLabel,
  firstPlaceholder,
  secondLabel,
  secondPlaceholder,
  firstHtmlForId,
  secondHtmlForId,
  children,
  hidden = false,
  firstType,
  secondType,
  onSubmit,
  firstHookform,
  secondHookform,
  firstName,
  secondName,
}: ModalFormProps) {
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const borderSize = clsx(
    'mt-16 w-[41.7rem]',
    borderStyle,
    'px-16 pt-16',
    { 'h-[35.5rem]': who === '게시자 (나)' },
    {
      'h-[85.7rem]': who !== '게시자 (나)',
    },
  );
  const [scheduleDetail, setScheduleDetail] = useState(''); // hookForm 쓸지 안 쓸지 결정해서 작업하기

  const handlePreventDefault = (e: any) => {
    e.preventDefault();
  };

  const handleScheduleDetailValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('일정내용입력인풋입니다.-필겸-');
    setScheduleDetail(e.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className={`${borderSize}`}>
        <p className={`${formTextSize} mb-[1.6rem]`}>{who}</p>
        <div className="mb-16 flex items-center gap-4">
          <img src={profile} alt="profile" />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">{userNickName}</p>
          {/*  */}
        </div>
        <div className=" flex flex-col gap-[0.8rem]">
          <ModalLabel
            label={`${firstLabel}`}
            className={`${formTextSize}`}
            htmlFor={`${firstHtmlForId}`}
          />
          <ModalInput
            name={firstName}
            hookform={firstHookform}
            type={firstType}
            placeholder={`${firstPlaceholder}`}
            id={`${firstHtmlForId}`}
            className={`${formTextSize} ${borderStyle} `}
          />
          {/* 밑에 p태그 데이터는 이 컴포넌트 안에서 처리 */}
          <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">0/20</p>
        </div>
        {children}
        <div className=" flex flex-col gap-[0.8rem]">
          <ModalLabel
            label={`${secondLabel}`}
            className={`${formTextSize}`}
            htmlFor={`${secondHtmlForId}`}
          />
          <ModalInput
            name={secondName}
            hookform={secondHookform}
            type={secondType}
            placeholder={`${secondPlaceholder}`}
            id={`${secondHtmlForId}`}
            className={`${formTextSize} ${borderStyle} `}
          />
        </div>
        {hidden && <ModalMemberList formTextSize={formTextSize} />}
      </div>

      <button className="mt-16 h-[4.6rem] w-[41.7rem] rounded-[0.6rem] bg-[#292929] px-[2.4rem] py-5 text-lg text-white">
        그룹 생성하기
      </button>
    </form>
  );
}

export default ModalForm;
