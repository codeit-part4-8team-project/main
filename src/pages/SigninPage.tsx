import { MouseEventHandler } from 'react';
import TextButton from '@/components/common/TextButton';
import { useAxios } from '@/hooks/useAxios';

const SigninPage = () => {
  console.log('컴포넌트 리렌더링됨');
  const { data, loading, error, fetchData } = useAxios({
    path: '/oauth2/authorization/google',
    method: 'GET',
    data: {},
  });

  const handleClickSocialLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    const provider = e.currentTarget.name;
    fetchData({
      newPath: `/oauth2/authorization/${provider}`,
    });
    console.dir(provider);
  };

  return (
    <div className="bg-gray20 flex min-h-screen flex-col items-center">
      <div className="bg-gray10 fixed top-0 flex h-[5.8rem] w-full justify-center">
        <img src="/public/assets/logo.svg" alt="Keepy-Uppy 로고" width={70} height={41}></img>
      </div>
      <div className="mt-[18.9rem] flex w-[112rem] basis-[67.7rem] rounded-[2.4rem]  bg-white">
        <div className="bg-gray100 w-[48rem] rounded-l-[inherit]"></div>
        <div className="flex flex-grow flex-col items-center rounded-r-[inherit]">
          <div className="mt-[10.3rem] flex w-[34.2rem] flex-col items-center">
            <img src="/public/assets/logo.svg" alt="Keepy-Uppy 로고" className="h-32"></img>
            <span className="mt-8 text-[#AAAAAA]">축구 트래핑처럼 공을 계속 띄우는 운동 행위</span>
            <div className="flex w-full flex-col items-center gap-16">
              <div className="mt-[12rem] flex h-8 w-full items-center justify-between gap-[1.35rem]">
                <div className="black w-full border-t-[0.1rem] border-solid border-t-[#5F5F5F4D]" />
                <span className="text-gray100 text-nowrap text-[1.2rem] font-medium leading-8">
                  간편 로그인
                </span>
                <div className="black w-full border-t-[0.1rem] border-solid border-t-[#5F5F5F4D]" />
              </div>
              <div className="flex w-full flex-col items-center gap-[1.2rem] ">
                <TextButton
                  name="google"
                  buttonSize="md"
                  color="white"
                  className="gap-[1rem] border-[0.1rem] border-solid border-[#E9E9E9]"
                  onClick={handleClickSocialLogin}
                >
                  <img src="/public/assets/logo-google.svg" alt="구글 로고"></img>
                  <span>구글 로그인</span>
                </TextButton>
                <TextButton
                  name="kakao"
                  buttonSize="md"
                  color="white"
                  className="gap-[1rem] bg-[#FEE500]"
                  onClick={handleClickSocialLogin}
                >
                  <img src="/public/assets/logo-kakao.svg" alt="카카오 로고"></img>
                  <span>카카오 로그인</span>
                </TextButton>
                <TextButton
                  name="github"
                  buttonSize="md"
                  className="gap-[1rem]"
                  onClick={handleClickSocialLogin}
                >
                  <img src="/public/assets/logo-github.svg" alt="깃허브 로고"></img>
                  <span>깃허브 로그인</span>
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};
export default SigninPage;
