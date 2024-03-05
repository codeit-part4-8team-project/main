import checkIcon from '../../../public/check.svg';
import profileImg from '../../../public/profile.svg';

export default function TaskCard() {
  return (
    <div className="flex h-[15.1rem] w-[29.6rem] flex-col justify-between border-[0.1rem] border-[#D2D2D2] bg-white p-[2.2rem]">
      <div className="flex justify-between">
        <span className="text-[1rem] font-bold">팀1</span>
        <img src={checkIcon} alt="체크 표시 아이콘" />
      </div>

      <div>
        <span className="text-[1.4rem] text-[#A1A1A1]">와이어 프레임 완성</span>
      </div>

      <div className="flex justify-between">
        <button className="rounded-[4rem] border-[0.1rem] border-[#DFDFDF] p-[0.6rem] text-[1rem] text-[#A1A1A1]">
          0.로그인 page
        </button>
        <div className="flex">
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
        </div>
      </div>
    </div>
  );
}
