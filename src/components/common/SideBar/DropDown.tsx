import { ReactNode } from 'react';

interface DropDownItemProps {
  children: ReactNode;
}

export default function DropDown() {
  return (
    <div className="absolute left-0 top-[2.4rem] z-30 flex w-40 flex-col rounded-[0.6rem] bg-[#FCFCFC] py-[0.4rem] shadow-[0px_0px_10px_0px_rgba(17,17,17,0.05)]">
      <DropDownItem>편집</DropDownItem>
      <DropDownItem>삭제</DropDownItem>
    </div>
  );
}

function DropDownItem({ children }: DropDownItemProps) {
  return (
    <button
      className="inline-flex h-[3.7rem] items-center justify-center p-4 text-[1.4rem] font-medium text-[#5F5F5F] hover:bg-[#EAEAEA]"
      type="button"
    >
      {children}
    </button>
  );
}
