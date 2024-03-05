export default function SideBar() {
  return (
    <div className="h-[970px] w-[260px] bg-[#F2F2F2] py-[24px]">
      <div className="flex h-[58px] w-full items-center justify-between bg-[#E3E3E3] px-[24px] py-[17px]">
        <div className="flex items-center gap-[10px]">
          <div className="h-[24px] w-[24px] rounded-full bg-[#5F5F5F]"></div>
          <span className="text-sm">홍길동</span>
        </div>
        <div className="h-[24px] w-[24px] bg-[#D9D9D9] text-center">&gt;</div>
      </div>
      <div className="mx-auto mb-[35px] mt-[24px] flex w-[228px] flex-col">
        <div className="flex h-[40px] w-full items-center justify-between rounded-md bg-[#E3E3E3] px-[10px] py-[8px] ">
          <div className="flex items-center gap-[10px]">
            <div className="h-[24px] w-[24px] bg-[#D9D9D9] text-center"></div>
            <div className="text-sm">대시보드</div>
          </div>
          <div className="h-[24px] w-[24px] bg-[#D9D9D9] text-center">⌄</div>
        </div>
        <div className="text-[#B1B1B1]">
          <ul>
            <li className="py-[12px] pl-[42px] text-sm">나의 캘린더</li>
            <li className="py-[12px] pl-[42px] text-sm">칸반보드</li>
            <li className="py-[12px] pl-[42px] text-sm">공지사항</li>
          </ul>
        </div>
      </div>
      <div className="flex h-[58px] w-full items-center justify-between bg-[#E3E3E3] px-[24px] py-[17px]">
        <span className="text-sm font-bold">그룹</span>
        <div className="h-[24px] w-[24px] bg-[#D9D9D9] text-center">+</div>
      </div>
      <div className="mx-auto flex w-[228px] flex-col">
        <div className="text-[#B1B1B1]">
          <ul>
            <li className="flex justify-between py-[12px] pl-[42px] pr-[12px] text-sm">
              <span>팀 1</span>
              <span className="text-[#D8D8D8]">수정</span>
            </li>
            <li className="flex justify-between py-[12px] pl-[42px] pr-[12px] text-sm">
              <span>스터디</span>
              <span className="text-[#D8D8D8]">수정</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
