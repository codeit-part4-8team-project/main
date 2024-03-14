function CompleteStepContent() {
  return (
    <div className="flex flex-col items-center gap-20">
      <span className="text-gray100 text-[2rem] font-medium leading-[2.2rem]">
        <span className="font-bold">키피어피</span> 회원이 되신걸 환영합니다.
      </span>
      <div className="mt-50 border-gray30 flex h-[34.6rem] w-[30rem] flex-col items-center rounded-[0.6rem] border-[0.1rem] border-solid">
        <img
          src="/public/assets/profile-large.svg"
          alt="유저 프로필사진"
          width={100}
          height={100}
          className="mt-20"
        ></img>
        <span className="text-gray100 mt-[1.6rem] text-[1.4rem] font-bold leading-[2.2rem]">
          울랄라고릴라
        </span>
        <span className="text-gray80 mt-[1.6rem] text-[1.2rem] leading-[2.2rem]">
          안녕하세요 반갑습니다
        </span>
        <span className="mt-[5.8rem] text-[1.2rem] leading-[2.2rem] text-[#C1C1C1]">
          2023-03-10 가입
        </span>
      </div>
    </div>
  );
}

export default CompleteStepContent;
