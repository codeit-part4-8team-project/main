import profile from '../../../../public/profile.svg';

interface ModalMemberListProps {
  formTextSize?: string;
}

export default function ModalMemberList({ formTextSize }: ModalMemberListProps) {
  return (
    <>
      <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
      <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
        <div className="text-body4-regular flex items-center gap-[1.6rem]">
          <img src={profile} alt="profile" />
          <div className="flex items-center gap-[17.1rem]">
            <p>#userNickName</p>
            <p className=" text-[#A1A1A1]">담당</p>
          </div>
        </div>
      </div>
    </>
  );
}
