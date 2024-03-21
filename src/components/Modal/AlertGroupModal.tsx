import profile from '../../../public/profile.svg';
import ModalCalendarInput from '../common/modal/ModalCalendarInput';
import ModalFormBorder from '../common/modal/ModalFormBorder';
import ModalInput from '../common/modal/ModalInput';
import ModalLabel from '../common/modal/ModalLabel';
import ModalLayout from '../common/modal/ModalLayout';

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
export default function AlertGroupModal({ closeClick }: AlertGroupModalProps) {
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  return (
    // <ModalLayout title={`${color} ${name}에 초대 되었습니다!`} closeClick={closeClick} size="md">
    <ModalLayout title="그룹 초대" closeClick={closeClick} size="md">
      <ModalFormBorder className="mt-16 h-[51.4rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5] px-12 pt-12">
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
            className={`${formTextSize} ${borderStyle} mb-12`}
          />
        </div>
        <div className="mb-12 flex flex-col gap-[0.8rem]">
          <ModalLabel label="그룹 설명" className={`${formTextSize}`} htmlFor="description" />
          <ModalInput
            name="description"
            type="text"
            id="description"
            className={`${formTextSize} ${borderStyle}`}
          />
        </div>
        <ModalCalendarInput />
      </ModalFormBorder>
    </ModalLayout>
  );
}
