import clsx from 'clsx';

interface ProfileStackProps {
  profileImgs: string[] | [];
  size: 'lg' | 'sm';
}

// 팀원의 프로필 이미지의 경로가 담긴 배열을 프롭으로 받아 최대 3명의 프로필을 보여주는 컴포넌트
export default function ProfileStack({ profileImgs, size }: ProfileStackProps) {
  profileImgs = profileImgs.slice(0, 3);

  const sizeClasses = clsx({
    'h-[3.6rem] w-[3.6rem]': size === 'lg',
    'h-[2.4rem] w-[2.4rem]': size === 'sm',
  });

  return (
    <div className="flex">
      {profileImgs.map((profile, idx) => {
        const imageClasses = clsx({
          'mr-0 z-0': idx === profileImgs.length - 1, // 2번 인덱스
          'mr-[-10px] z-10': idx === profileImgs.length - 2, // 1번 인덱스
          'mr-[-10px] z-20': idx === profileImgs.length - 3, // 0번 인덱스
        });
        return (
          <img
            className={clsx(`rounded-full`, imageClasses, sizeClasses)}
            src={profile}
            key={idx}
          />
        );
      })}
    </div>
  );
}
