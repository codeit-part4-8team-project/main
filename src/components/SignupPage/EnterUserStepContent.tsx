import TextButton from '../common/TextButton';

function EnterUserStepContent() {
  return (
    <div className="flex h-[45.9rem] w-[74rem] flex-col pl-[19.2rem] pr-[19.1rem]">
      <span className="text-[1.4rem] font-medium leading-[2.2rem] text-black">프로필 이미지</span>
      <div className="mt-4 flex items-center justify-end gap-[5.8rem]">
        <img src="/public/assets/profile-large.svg" className="" width={66} height={66}></img>
        <TextButton buttonSize="sm" color="white">
          프로필 변경
        </TextButton>
      </div>
      <input></input>
      {/* 필겸님 공통컴포넌트 만드시는걸로 대체 */}
      <input></input>
      <input></input>
    </div>
  );
}

export default EnterUserStepContent;
