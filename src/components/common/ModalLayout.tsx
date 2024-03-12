import { ReactNode, useRef, useState } from 'react';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import baseEllipseColor from '../../../public/assets/baseEllipseColor.svg';
import close from '../../../public/assets/close.svg';
import people from '../../../public/assets/people-fill.svg';
import profile from '../../../public/profile.svg';
import ModalInput from './ModalInput';
import ModalToggle from './ModalToggle';

interface ModalProps {
  children?: ReactNode;
}
function ModalLayout({ children }: ModalProps) {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  console.log(ref);
  const handleToggleOutside = (e: MouseEvent) => {
    if (ref.current && ref.current === e.target) {
      console.log('?');
      setToggle(false);
    }
  };
  const handlePreventDefault = (e: any) => {
    e.preventDefault();
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderSize = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  return (
    <div className="flex size-full items-center justify-center bg-black bg-opacity-5">
      <div className="relative h-[85.5rem] w-[49.7rem] bg-white p-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={people} alt="peopleImg" />
            그룹생성
          </div>
          <img src={close} alt="closeButton" />
        </div>
        {/* form부분 */}
        <form onSubmit={handlePreventDefault}>
          <div className={`mt-16 h-[61.9rem] w-[41.7rem] ${borderSize} mb-16 px-12 pb-8  pt-12`}>
            <p className={`${formTextSize} mb-[1.6rem]`}> 그룹 게시자 </p>
            <div className="mb-16 flex items-center gap-4">
              <img src={profile} alt="profile" />
              <p className=" text-[1.4rem]">#userNickName</p>
            </div>
            <div className="mb-12 flex flex-col gap-[0.8rem]">
              <label className={`${formTextSize}`} htmlFor="name">
                그룹이름
              </label>
              <ModalInput
                placeholder="그룹 이름을 입력해 주세요."
                id="name"
                className={`${formTextSize} ${borderSize} `}
              />
            </div>
            <label className={`${formTextSize} `}>그룹 컬러 칩</label>
            <div className="mb-12 mt-8 flex items-center gap-12">
              <img src={baseEllipseColor} alt="기본색상" />
              <button onClick={handleToggle} type="button" className="relative w-[10rem]" ref={ref}>
                <div
                  className={`${borderSize}   flex cursor-pointer items-center px-[1.8rem] py-[1.2rem]`}
                >
                  컬러 설정
                  <img alt="토글버튼" src={arrowDown} />
                </div>
                {toggle && <ModalToggle />}
              </button>
            </div>

            <div className="mb-12 flex flex-col gap-[0.8rem]">
              <label className={`${formTextSize}`} htmlFor="invite">
                팀원 초대
              </label>
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
      </div>
    </div>
  );
}
export default ModalLayout;
