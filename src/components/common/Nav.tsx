import plusIcon from '../../../public/plus.svg'
function Nav() {
  const linkStyles = " text-xs text-gray-400   font-extrabold hover:underline rounded-full bg-gray-100 w-9 h-9 px-2 py-4";
const ProfileAlarmStyles ="text-xs text-gray-300 hover:underline rounded-full bg-gray-700 w-9 h-9 px-1.5 py-2.5";
  return (
    <div className=" m-0 flex justify-between items-center bg-white">
      <div className="flex items-center ">
        <a href='/' className="text-sm  text-gray-300 font-bold w-10 h-6 ml-28">Logo</a>
        <div className=" ml-40 mt-2.5">
          <a href="#" className={`${linkStyles} mr-2.5`}>링크1</a>
          <a href="#" className={`${linkStyles} mr-2.5`}>링크2</a>
          <a href="#" className={linkStyles}>링크3</a>
        </div>
        <img src={plusIcon} alt="Plus Icon" className= "bg-gray-300 px-1 py-1 ml-4 mt-4" />
      </div>
      <div className="flex items-center mt-2.5 mr-6">
        <div className={`${ProfileAlarmStyles} mr-4`}>알림</div>
        <div className={ProfileAlarmStyles}>프로필</div>
      </div>
    </div>
  );
}

export default Nav;