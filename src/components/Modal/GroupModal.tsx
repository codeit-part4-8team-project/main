import { useState } from 'react';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import profile from '../../../public/profile.svg';
import ModalLabel from '../ModalAtuom/ModalLabel';
import ModalColorToggle from '@/components/common/ModalColorToggle';
import ModalLayout from '@/components/common/ModalLayout';
import ModalInput from '@/components/ModalAtuom/ModalInput';

interface GroupModalProps {
  closeClick?: () => void;
}
function GroupModal({ closeClick }: GroupModalProps) {
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderSize = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const [color, setColor] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleColorClick = (color: string) => {
    setColor(color);
  };
  console.log(color);

  const handlePreventDefault = (e: any) => {
    e.preventDefault();
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  console.log('groupModal');
  return (
    <ModalLayout closeClick={closeClick} title="그룹 생성">
      <form onSubmit={handlePreventDefault}>
        <div className={`mt-16 h-[61.9rem] w-[41.7rem] ${borderSize} mb-16 px-12 pb-8  pt-12`}>
          <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">#userNickName</p>
            {/*  */}
          </div>
          <div className="mb-12 flex flex-col gap-[0.8rem]">
            <ModalLabel label="그룹이름" className={`${formTextSize}`} htmlFor="name" />
            <ModalInput
              placeholder="그룹 이름을 입력해 주세요."
              id="name"
              className={`${formTextSize} ${borderSize} `}
            />
          </div>
          <label className={`${formTextSize} `}>그룹 컬러 칩</label>
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
                className={`${borderSize} flex cursor-pointer items-center justify-center gap-[0.4rem] px-4 py-[1.2rem] text-xl font-bold`}
              >
                컬러 설정
                <img alt="토글버튼" src={arrowDown} />
              </div>
              {toggle && <ModalColorToggle handleColorClick={handleColorClick} />}
            </button>
          </div>

          <div className="mb-12 flex flex-col gap-[0.8rem]">
            <ModalLabel className={formTextSize} htmlFor="invite" label="팀원 초대" />
            <div className="flex items-center gap-[1.2rem]">
              <ModalInput
                placeholder="닉네임을 검색해 주세요."
                className={`${borderSize} ${formTextSize}`}
                id="invite"
              />
              <div className="rounded-[0.6rem] bg-[#292929] px-[1.8rem] py-[1.2rem] text-[1.2rem]  text-white">
                초대 하기
              </div>
            </div>
          </div>
          <p className={`${formTextSize} mb-[0.8rem]`}>팀원</p>
          <div
            className=" h-[10.6rem] w-[35.5rem]
            rounded-[0.6rem]
            bg-[#F7F7F7]"
          ></div>
        </div>
        <button className="h-[4.6rem] w-[41.7rem] rounded-[0.6rem] bg-[#292929] px-[2.4rem] py-5 text-lg text-white">
          그룹 생성하기
        </button>
      </form>
    </ModalLayout>
  );
}
export default GroupModal;
