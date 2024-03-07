import plusIcon from '../../../public/plus.svg';

function Nav() {
  const linkStyles =
    ' text-xs text-gray-400   font-extrabold hover:underline rounded-full bg-gray-100 w-9 h-9 px-2 py-4';
  const ProfileAlarmStyles =
    'text-xs text-gray-300 hover:underline rounded-full bg-gray-700 w-9 h-9 px-1.5 py-2.5';

  return (
    <div className="z-1 fixed left-0 right-0 top-0 m-0 flex items-center justify-between border-b  border-solid border-gray-300 bg-white">
      <div className="flex items-center ">
        <a href="/" className="my-4  ml-28 h-6 w-10 text-sm font-bold text-gray-300">
          Logo
        </a>
        <div className=" my-2.5 ml-40">
          <a href="#" className={`${linkStyles} mr-2.5`}>
            링크1
          </a>
          <a href="#" className={`${linkStyles} mr-2.5`}>
            링크2
          </a>
          <a href="#" className={linkStyles}>
            링크3
          </a>
        </div>
        <img src={plusIcon} alt="Plus Icon" className="my-4 ml-4 bg-gray-300 px-1 py-1" />
      </div>
      <div className="my-2.5 mr-6 flex items-center">
        <div className={`${ProfileAlarmStyles} mr-4`}>알림</div>
        <div className={ProfileAlarmStyles}>프로필</div>
      </div>
    </div>
  );
}

export default Nav;
