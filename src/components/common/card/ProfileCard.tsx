import { useUserContext } from '@/contexts/UserProvider';
import { prefixingUsername } from '@/lib/prefixingUsername';
import ProfileIcon from '@/assets/ProfileIcon';

export default function ProfileCard() {
  const { user } = useUserContext();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        {user?.imageUrl ? (
          <img
            src={user?.imageUrl}
            alt="유저 프로필사진"
            className="h-40 w-40 rounded-full object-cover"
          ></img>
        ) : (
          <ProfileIcon size="lg" className="h-40 w-40"></ProfileIcon>
        )}
        <span className="mt-[1.6rem] text-body3-bold text-gray100">
          {prefixingUsername(user?.name)}
        </span>
        <span className="text-body5-regular leading-[2.2rem] text-gray80">{user?.username}</span>
        <span className="mt-[2.2rem] w-[26.4rem] text-center text-body4-regular leading-[2.2rem] text-gray80">
          {user?.bio || '자기소개를 작성해보세요'}
        </span>
      </div>
      <span className=" text-body4-regular leading-[2.2rem] text-[#C1C1C1]">
        {`2023-03-01 가입`}
      </span>
    </div>
  );
}
