interface ModalMemberListProps {
  formTextSize?: string;
}

export default function ModalMemberList({ formTextSize }: ModalMemberListProps) {
  return (
    <>
      <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
      <div
        className=" h-[10.6rem] w-full
rounded-[0.6rem]
bg-[#F7F7F7]"
      ></div>
    </>
  );
}
