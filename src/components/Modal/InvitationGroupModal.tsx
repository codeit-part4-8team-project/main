import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';

interface InvitationGroupModalProps {
  closeClick: () => void;
}

interface DefaultValue {
  color?: string;
  description?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  members?: membersType[] | [];
}

interface membersType {
  name: string;
  imageUrl: string;
  role?: string | null;
  grade: string;
  username: string;
  createdDate: string;
}

// "name": "필겸",
// "imageUrl": "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640",
// "role": null,
// "grade": "OWNER",
// "username": "user-PUESAx6JqD",
// "createdDate": "2024-03-29"

// 2024/03/27
// 승인을 클릭 했을때 어떤 api로 통신을 해야할지?
// put으로 팀 초대 수락이 있고 그 이후의 모달에서 정보수정 put을 보내면 되는건가?

export default function InvitationGroupModal({ closeClick }: InvitationGroupModalProps) {
  const teamId = 3;
  const { data: defaultValue } = useAxios<DefaultValue>(
    {
      path: `team/${teamId}`,
    },
    true,
  );
  console.log(defaultValue);
  const { fetchData: deleteFetch } = useAxios({});
  const { color, description, name, startDate, endDate, members } = defaultValue || {};
  // console.log(members[0]);
  // 여기 teamId는 프롭으로 useParms를 못 받을것 같은데 어떻게 가져오지?
  const handleDeleteClick = () => {
    deleteFetch({
      newPath: `member/invite/${teamId}`,
      newMethod: 'DELETE',
    });
  };
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30 mb-12  w-full px-[1.8rem] py-[1.2rem]';
  return (
    <ModalLayout title="그룹 초대" closeClick={closeClick} size="md">
      <ModalFormBorder className="mt-16 h-[51.4rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 py-12">
        <div className="mb-20 flex items-center gap-4 text-[1.8rem] font-bold">
          그룹에 추가되었습니다!
        </div>
        <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
        <div className="mb-12 flex items-center gap-4">
          {members ? (
            <>
              <img
                src={members[0]?.imageUrl}
                alt="profile"
                className="h-[2.4rem] w-[2.4rem] rounded-[9999px]"
              />
              <p className=" text-[1.4rem]">{members[0]?.name}</p>
            </>
          ) : (
            <>
              <img src={profile} alt="profile" className="h-[2.4rem] w-[2.4rem] rounded-[9999px]" />
              <p className=" text-[1.4rem]">useName</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className={`${formTextSize}`}>그룹이름</p>
          {/* <div className={`${inputTextSize} ${borderStyle}`}>필요한 데이터</div> */}
          <div className={`${inputTextSize} ${borderStyle}`}>{name}</div>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className={`${formTextSize}`}>그룹 설명</p>
          {/* <div className={`${inputTextSize} ${borderStyle}`}>필요한 데이터</div> */}
          <div className={`${inputTextSize} ${borderStyle}`}>{description}</div>
        </div>
        <p className={`${formTextSize}`}>날짜 (시작-종료)</p>
        <div className=" mb-12 mt-[0.9rem] flex items-center gap-2">
          <div
            className={`${formTextSize} flex w-full items-center  justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem]`}
          >
            <p>2025년 3월 30일 </p>
            {/* <p>{startDate}</p> */}
            <img src={calender} alt="캘린더" />
          </div>
          <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
          <div
            className={`${formTextSize} flex w-full items-center  justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem]`}
          >
            <p>2025년 3월 30일 </p>
            {/* <p>{endDate}</p> */}
            <img src={calender} alt="캘린더" />
          </div>
        </div>
      </ModalFormBorder>
      <div className="mt-12 flex gap-[1.7rem]">
        <TextButton buttonSize="md" color="white" onClick={handleDeleteClick}>
          거부
        </TextButton>
        <TextButton buttonSize="md">승인</TextButton>
      </div>
    </ModalLayout>
  );
}
