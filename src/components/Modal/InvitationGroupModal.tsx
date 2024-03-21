import profile from '../../../public/profile.svg';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';

interface AlertGroupModalProps {
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
export default function InvitationGroupModal({ closeClick }: AlertGroupModalProps) {
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  return (
    // <ModalLayout title={`${color} ${name}에 초대 되었습니다!`} closeClick={closeClick} size="md">
    <ModalLayout title="그룹 초대" closeClick={closeClick} size="md">
      <ModalFormBorder className="border-gray30 mt-16 h-[51.4rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] px-12 pt-12">
        <div className="mb-20 flex items-center gap-4 text-[1.8rem] font-bold">
          그룹에 추가되었습니다!
        </div>
        <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
        <div className="mb-16 flex items-center gap-4">
          <img src={profile} alt="profile" />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">userNickName</p>
          {/*  */}
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel label="그룹 이름" className={`${formTextSize}`} htmlFor="name" />
          <ModalInput
            name="name"
            type="text"
            id="name"
            className={`${inputTextSize} ${borderStyle} mb-12`}
          />
        </div>
        <div className="mb-12 flex flex-col gap-[0.8rem]">
          <ModalLabel label="그룹 설명" className={`${formTextSize}`} htmlFor="description" />
          <ModalInput
            name="description"
            type="text"
            id="description"
            className={`${inputTextSize} ${borderStyle}`}
          />
        </div>
        <ModalCalendarInput />
      </ModalFormBorder>
    </ModalLayout>
  );
}
