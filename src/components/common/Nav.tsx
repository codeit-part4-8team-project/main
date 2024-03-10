import LogoImg from '../../../public/assets/Logo.svg';
import profileIcon from '../../../public/assets/ProfileIcon.svg';
import bellIcon from '../../../public/assets/bellFill.svg';
import globalLink from '../../../public/assets/globe-dark.svg';
import plusCircle from '../../../public/assets/plus-circle-dark.svg';

function Nav() {
  return (
    <div className="z-1 fixed left-0 right-0 top-0 m-0 flex items-center justify-between  bg-[#F7F7F7]">
      <div className="mb-[0.8rem] mt-[1.1rem] flex items-center  ">
        <a href="/" className="ml-16 mt-[1.7rem] ">
          <img src={LogoImg} alt="로고 이미지 " />
        </a>
        <div className=" ml-[17.4rem] flex items-center gap-[0.8rem]">
          <a href="#" className="relative h-[3.6rem] w-[3.6rem] rounded-full bg-[#5F5F5F1A]">
            <img
              className="[0.6rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              src={globalLink}
              alt="글로벌 아이콘"
            />
          </a>
          <a href="#" className="mr-2.5">
            <img src={plusCircle} alt="추가하기 아이콘" />
          </a>
        </div>
      </div>
      <div className="my-2.5 mr-6 flex items-center gap-8">
        <img src={bellIcon} alt="알람 아이콘" />
        <img src={profileIcon} alt="프로필 아이콘" />
      </div>
    </div>
  );
}

export default Nav;
