interface ProfileStackProps {
  profileImgs: string[];
}

// 팀원의 프로필 이미지의 경로가 담긴 배열을 프롭으로 받아 최대 3명의 프로필을 보여주는 컴포넌트
export default function ProfileStack({ profileImgs }: ProfileStackProps) {
  profileImgs = profileImgs.slice(0, 3);

  return (
    <div className="flex ">
      {profileImgs.map((profile, idx) => {
        const zIndex = idx === 0 ? 20 : idx === 1 ? 10 : 0;
        const marginRight = idx === profileImgs.length - 1 ? 0 : -10;
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
