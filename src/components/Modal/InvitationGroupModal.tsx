import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';

interface InvitationGroupModalProps {
  closeClick: () => void;
}
// [
//   {
//     "id": 0,
//     "name": "string",
//     "description": "string",
//     "color": "string",
//     "members": [
//       {
//         "name": "string",
//         "imageUrl": "string",
//         "role": "string",
//         "grade": "string"
//       }
//     ]
//   }

export default function InvitationGroupModal({ closeClick }: InvitationGroupModalProps) {
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30 mb-12  w-full px-[1.8rem] py-[1.2rem]';
  return (
    // <ModalLayout title={`${color} ${name}에 초대 되었습니다!`} closeClick={closeClick} size="md">
    <ModalLayout title="그룹 초대" closeClick={closeClick} size="md">
      <ModalFormBorder className="mt-16 h-[51.4rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 py-12">
        <div className="mb-20 flex items-center gap-4 text-[1.8rem] font-bold">
          그룹에 추가되었습니다!
        </div>
        <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
        <div className="mb-12 flex items-center gap-4">
          <img src={profile} alt="profile" />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">userNickName</p>
          {/*  */}
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className={`${formTextSize}`}>그룹이름</p>
          <div className={`${inputTextSize} ${borderStyle}`}>필요한 데이터</div>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className={`${formTextSize}`}>그룹 설명</p>
          <div className={`${inputTextSize} ${borderStyle}`}>필요한 데이터</div>
        </div>
        <p className={`${formTextSize}`}>날짜 (시작-종료)</p>
        <div className=" mb-12 mt-[0.9rem] flex items-center gap-2">
          <div
            className={`${formTextSize} w-full rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem]`}
          >
            해당하는 end날짜값
            <img src={calender} alt="캘린더" className="absolute bottom-0 right-[1.8rem] top-0" />
          </div>

          <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
          <div
            className={`${formTextSize} w-full rounded-[0.6rem] border-[0.1rem]  border-gray30 px-[1.8rem] py-[1.2rem]`}
          >
            해당하는 end날짜값
            <img src={calender} alt="캘린더" className="absolute bottom-0 right-[1.8rem] top-0" />
          </div>
        </div>
      </ModalFormBorder>
    </ModalLayout>
  );
}
