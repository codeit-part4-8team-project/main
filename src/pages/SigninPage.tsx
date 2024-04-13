import { MouseEventHandler, useEffect } from 'react';
import TextButton from '@/components/common/TextButton';
import { useAxios } from '@/hooks/useAxios';
import GithubIcon from '@/assets/GithubIcon';
import GoogleIcon from '@/assets/GoogleIcon';
import KakaoIcon from '@/assets/KaKaoIcon';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';

interface OauthURLResponse {
  url: string;
}

const SigninPage = () => {
  console.log('컴포넌트 리렌더링됨');

  const { data, error, fetchData } = useAxios<OauthURLResponse>({
    method: 'GET',
  });

  const handleClickSocialLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    const provider = e.currentTarget.name;
    fetchData({
      newPath: `/oauth/url/${provider}`,
    });
    console.dir(provider);
  };

  useEffect(() => {
    if (data) {
      window.open(data.url, '_self');
    }
    if (error) {
      alert('로그인에 실패하였습니다.');
      console.error(error);
    }
  }, [data, error]);

  return (
    <div className="flex basis-[112rem] rounded-[2.4rem] bg-white">
      <div className="flex flex-grow basis-[46rem] rounded-l-[inherit] bg-black pr-[8%] max-xl:hidden">
        <img src="/src/assets/assets/login-banner-logo.svg" className="self-end"></img>
      </div>
      {/* pb-[12rem] pl-[16.4rem] pr-[15.7rem] pt-[11.7rem] 버튼 컨테이너 w-[34.2]*/}
      <div className="flex flex-grow basis-[66rem] flex-col items-center justify-center rounded-r-[inherit]">
        <div className="mx-12 my-12 flex w-[34.2rem] basis-[44rem] flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-[2.6rem]">
            <KeepyUppyIcon className="h-28 w-28" />
            <KeepyUppyLogo size="md" />
          </div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className=" flex h-8 w-full items-center justify-between gap-[1.35rem]">
              <div className="black w-full border-t-[0.1rem] border-solid border-t-[#5F5F5F4D]" />
              <span className="text-nowrap text-[1.2rem] font-medium leading-8 text-gray100">
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
                <GoogleIcon />
                <span>구글 로그인</span>
              </TextButton>
              <TextButton
                name="kakao"
                buttonSize="md"
                color="yellow"
                className="gap-[1rem]"
                onClick={handleClickSocialLogin}
              >
                <KakaoIcon />
                <span>카카오 로그인</span>
              </TextButton>
              <TextButton
                name="github"
                buttonSize="md"
                className="gap-[1rem]"
                onClick={handleClickSocialLogin}
              >
                <GithubIcon />
                <span>깃허브 로그인</span>
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninPage;
