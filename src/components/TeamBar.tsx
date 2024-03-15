import profileImg from '../../public/profile.svg';

const team = {
  id: 0,
  name: 'string',
  description: 'string',
  members: [
    {
      name: 'string',
      role: 'string',
      grade: 'string',
    },
  ],
};

export default function TeamBar() {
  return (
    <div className="w-fill left-[26rem] right-0 top-[4.3rem] flex h-[5.8rem] items-center justify-between border-[0.1rem] border-[#eee] bg-white px-[2.4rem] py-[1.1rem]">
      <span className="text-body2-bold">{team.name}</span>
      <div className="flex items-center gap-[1.8rem]">
        <div className="flex gap-[1rem]">
          <button className="h-[1.6rem] w-[1.6rem] bg-[#D9D9D9] text-center">+</button>
          <span>초대</span>
          {/* TODO 초대 모달 띄우기 */}
        </div>
        <div className="flex">
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
          <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
        </div>
      </div>
    </div>
  );
}
