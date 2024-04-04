import { Link } from 'react-router-dom';

export default function LandingNav() {
  return (
    <div className="flex h-28 items-center justify-between  py-[1.6rem] pl-24 pr-[8rem] text-body2-regular text-white">
      <p className="text-body1-bold">KEEPY_UPPY</p>
      <div className="flex gap-[2.5rem] text-body2-regular">
        <p>
          <Link to={'signin'}>로그인하기</Link>
        </p>
        <p>
          <Link to={'signup'}>회원가입하기</Link>
        </p>
      </div>
    </div>
  );
}
