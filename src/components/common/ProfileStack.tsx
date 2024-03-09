interface ProfileStackProps {
  profileImgs: string[];
}

const STYLE = {
  0: {
    zIndex: 20,
    marginRight: -10,
  },
  1: {
    zIndex: 10,
    marginRight: -10,
  },
  2: {
    zIndex: 0,
    marginRight: 0,
  },
};

// 프로필 이미지 경로 배열에 담아서 프롭으로 내려줌
export default function ProfileStack({ profileImgs }: ProfileStackProps) {
  // const profileCount = profileImgs.length;
  return (
    <div className="flex ">
      {/* <img className="z-20 mr-[-10px] h-[2.4rem] w-[2.4rem]" src={profileImgs[profileCount - 3]} />
      <img className="z-10 mr-[-10px] h-[2.4rem] w-[2.4rem]" src={profileImgs[profileCount - 2]} />
      <img className="z-0 h-[2.4rem] w-[2.4rem]" src={profileImgs[profileCount - 1]} /> */}
      {profileImgs.map((profile, idx) => {
        const { zIndex, marginRight } = STYLE[idx as keyof typeof STYLE];
        return (
          <img
            className={`mr-[${marginRight}px] z-${zIndex} h-[2.4rem] w-[2.4rem]`}
            src={profile}
            key={idx}
          />
        );
      })}
    </div>
  );
}
