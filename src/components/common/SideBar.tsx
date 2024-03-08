import { useState } from 'react';
import GroupEditModal from '../Modal/GroupEditModal';
import GroupModal from '../Modal/GroupModal';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditButtonClick = () => {
    setIsEditOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleCloseEditClick = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleCloseClick} />}
      {isEditOpen && <GroupEditModal closeClick={handleCloseEditClick} />}
      <div className="fixed left-0 h-[97rem] w-[26rem] bg-[#F2F2F2] py-[2.4rem]">
        <div className="flex h-[5.8rem] w-full items-center justify-between bg-[#E3E3E3] px-[2.4rem] py-[1.7rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="h-[2.4rem] w-[2.4rem] rounded-full bg-[#5F5F5F]"></div>
            <span className="text-[1.4rem]">홍길동</span>
          </div>
          <a href="/myPage/1">
            <button className="h-[2.4rem] w-[2.4rem] bg-[#D9D9D9] text-center">&gt;</button>
          </a>
        </div>
        <div className="mx-auto mb-[3.5rem] mt-[2.4rem] flex w-[22.8rem] flex-col">
          <div className="flex h-[4rem] w-full items-center justify-between rounded-md bg-[#E3E3E3] px-[1rem] py-[0.8rem] ">
            <div className="flex items-center gap-[1rem]">
              <div className="h-[2.4rem] w-[2.4rem] bg-[#D9D9D9] text-center"></div>
              <div className="text-[1.4rem]">대시보드</div>
            </div>
            <button className="h-[2.4rem] w-[2.4rem] bg-[#D9D9D9] text-center">⌄</button>
          </div>
          <div className="text-[#B1B1B1]">
            <ul>
              <li className="py-[1.2rem] pl-[4.2rem] text-[1.4rem]">
                <a href="/schedules/1">나의 캘린더</a>
              </li>
              <li className="py-[1.2rem] pl-[4.2rem] text-[1.4rem]">
                <a href="/myIssues/1">칸반보드</a>
              </li>
              <li className="py-[1.2rem] pl-[4.2rem] text-[1.4rem]">
                <a href="teams/1/posts">공지사항</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex h-[5.8rem] w-full items-center justify-between bg-[#E3E3E3] px-[2.4rem] py-[1.7rem]">
          <span className="text-[1.4rem] font-bold">그룹</span>
          <button
            type="button"
            onClick={handleButtonClick}
            className="h-[2.4rem] w-[2.4rem] bg-[#D9D9D9] text-center"
          >
            +
          </button>
        </div>
        <div className="mx-auto flex w-[22.8rem] flex-col">
          <div className="text-[#B1B1B1]">
            <ul>
              <li className="flex justify-between py-[1.2rem] pl-[4.2rem] pr-[1.2rem] text-[1.4rem]">
                <a href="/teams/1">팀 1</a>
                <button onClick={handleEditButtonClick} className="text-[#D8D8D8]">
                  수정
                </button>
              </li>
              <li className="flex justify-between py-[1.2rem] pl-[4.2rem] pr-[1.2rem] text-[1.4rem]">
                <a href="/teams/1">스터디</a>
                <button onClick={handleEditButtonClick} className="text-[#D8D8D8]">
                  수정
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
