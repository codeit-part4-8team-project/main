import { MouseEventHandler, useEffect } from 'react';
import TextButton from '@/components/common/TextButton';
import { useAxios } from '@/hooks/useAxios';
import GithubIcon from '@/assets/GithubIcon';
import GoogleIcon from '@/assets/GoogleIcon';
import KakaoIcon from '@/assets/KaKaoIcon';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';
import imageUrl from '@/assets/assets/login-banner-icon.svg';

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
    <div className="flex min-h-screen flex-col items-center bg-gray20">
      <div className="fixed top-0 flex h-[5.8rem] w-full items-center justify-center gap-[0.8rem] bg-gray10">
        <KeepyUppyIcon fill="#292929" />
        <KeepyUppyLogo size="sm" />
      </div>
      <div className="mt-[18.9rem] flex w-[112rem] basis-[68rem] rounded-[2.4rem]  bg-white">
        <div
          // className={`relative w-[48rem] rounded-l-[inherit] bg-[url(${imageUrl})] bg-cover`}
          // className={`relative w-[48rem] rounded-l-[inherit] bg-['/public/assets/login-banner-icon.png'] bg-cover`}
          // className={`relative w-[48rem] rounded-l-[inherit]`}
          // style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
          className="rounded-l-[inherit] bg-black"
        >
          <img src={imageUrl} width={460} height={680}></img>
        </div>
        <div className="flex flex-grow flex-col items-center rounded-r-[inherit]">
          <div className="mt-[10.3rem] flex w-[34.2rem] flex-col items-center">
            <div className="flex flex-col items-center gap-[2.6rem]">
              <KeepyUppyIcon className="h-28 w-28" />
              <KeepyUppyLogo size="md" />
            </div>
            <div className="flex w-full flex-col items-center gap-16">
              <div className="mt-[12rem] flex h-8 w-full items-center justify-between gap-[1.35rem]">
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
      <footer className="fixed bottom-0 flex h-[5.8rem] w-full items-center justify-center bg-gray10">
        <span className="text-body4-bold text-gray50">
          All Rights Reserved ⓒ 2024 Project Team8-Codeit KEEPY UPPY.
        </span>
      </footer>
    </div>
  );
};
export default SigninPage;
