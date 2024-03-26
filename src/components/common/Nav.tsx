import LogoImg from '../../../public/assets/Logo.svg';
import globalLink from '../../../public/assets/globe-dark.svg';
import GroupIcon from '@/assets/GroupIcon';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import ProfileIcon from '@/assets/ProfileIcon';

function Nav() {
  return (
    <div className="z-1 fixed left-0 right-0 top-0 z-50 m-0  flex items-center justify-between bg-gray10">
      <div className="mb-[0.8rem] mt-[1.1rem] flex items-center  ">
        <a href="/" className="ml-16 mt-[1.7rem] ">
          <img src={LogoImg} alt="로고 이미지 " />
        </a>
        <div className=" ml-[17.4rem] flex items-center gap-[0.8rem]">
          <a href="#" className="relative h-[3.6rem] w-[3.6rem] rounded-full bg-gray80">
            <img
              className="[0.6rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              src={globalLink}
              alt="글로벌 아이콘"
            />
          </a>
          <a href="#" className="mr-2.5">
            <PlusCircleIcon></PlusCircleIcon>
          </a>
        </div>
      </div>
      <div className="my-2.5 mr-6 flex items-center gap-8">
        <GroupIcon></GroupIcon>
        <ProfileIcon size="lg" />
      </div>
    </div>
  );
}

export default Nav;
