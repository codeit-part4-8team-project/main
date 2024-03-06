import profileImg from '../../public/profile.svg';

export default function TeamBar() {
  return (
    <div className="w-fill flex h-[5.8rem] items-center justify-between border-[0.1rem] border-[#eee] bg-white px-[2.4rem] py-[1.1rem]">
      <span className="text-[1.6rem] font-bold">팀 1</span>
      <div className="flex items-center gap-[1.8rem]">
        <div className="flex gap-[1rem]">
          <div className="h-[1.6rem] w-[1.6rem] bg-[#D9D9D9] text-center">+</div>
          <span>초대</span>
        </div>
        <div className="flex">
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
        </div>
      </div>
    </div>
  );
}
