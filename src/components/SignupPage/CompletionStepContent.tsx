import { useUserContext } from '@/contexts/UserProvider';
import { prefixingUsername } from '@/lib/prefixingUsername';
import ProfileIcon from '@/assets/ProfileIcon';

function CompletionStepContent() {
  const { user } = useUserContext(true);
  const todayDateTime = new Date();
  const today = todayDateTime.toISOString().split('T')[0];
  return (
    <div className="flex flex-col items-center gap-20">
      <span className="text-[2rem] font-medium leading-[2.2rem] text-gray100">
        <span className="font-bold">키피어피</span> 회원이 되신걸 환영합니다.
      </span>
      <div className="mt-50 flex h-[34.6rem] w-[30rem] flex-col items-center justify-between rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 pb-16 pt-20">
        <div className="flex flex-col items-center gap-[1.6rem]">
          {user?.imageUrl ? (
            <img
              src={user?.imageUrl}
              alt="유저 프로필사진"
              className="h-40 w-40 rounded-full object-cover"
            ></img>
          ) : (
            <ProfileIcon size="lg" className="h-40 w-40"></ProfileIcon>
          )}
          <span className="text-body3-bold text-gray100 ">{prefixingUsername(user?.username)}</span>
          <span className="w-80 text-center text-body4-regular leading-[2.2rem] text-gray80">
            {user?.bio || '마이페이지에서 자기소개를 작성해보세요'}
          </span>
        </div>
        <span className=" text-body4-regular leading-[2.2rem] text-[#C1C1C1]">
          {`${today} 가입`}
        </span>
      </div>
    </div>
  );
}

export default CompletionStepContent;
