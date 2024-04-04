import TextButton from '@/components/common/TextButton';
import AfterApproval from '@/components/common/modal/AfterApprovalModal';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { Member } from '@/types/teamTypes';
import calender from '@/assets/assets/calendar-dark.svg';

interface InvitationGroupModalProps {
  closeClick: () => void;
  teamId: number;
}

interface DefaultValue {
  description?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  members?: Member[];
}

interface GroupApproveData {
  id?: number;
}
// 얘는 어떻게 프롭으로 받아야하지? 들어가는 위치를 모르겠네
export default function InvitationGroupModal({
  closeClick,
  teamId,
  // 합칠때 얘도 기본값 빼기 에러 떠서 넣어놓음
}: InvitationGroupModalProps) {
  const { data: defaultValue } = useAxios<DefaultValue>(
    {
      path: `team/${teamId}`,
    },
    true,
  );
  // 승인 버튼 클릭시 일단 patch 로 승인 보내고 나서
  // 승인 버튼 클릭했을때 memberId 쏘는거 받아서 member/${memberId} patch로 role 보내기
  // grade는 피룡없음
  const { fetchData: deleteFetch } = useAxios({});
  const { data: GroupApproveData, fetchData: GroupApproveClick } = useAxios<GroupApproveData>({});
  const { description, name, startDate, endDate } = defaultValue || {};
  const { user } = useUserContext();
  const openModal = useModal();

  // 여기 teamId는 프롭으로 useParms를 못 받을것 같은데 어떻게 가져오지?
  const handleDeleteClick = () => {
    deleteFetch({
      newPath: `member/invite/${teamId}`,
      newMethod: 'DELETE',
    });
  };

  const handleGroupApproveClick = () => {
    GroupApproveClick({
      newPath: `member/invite/${teamId}`,
      newMethod: 'PATCH',
    });
  };
  const { id: memberId }: GroupApproveData = GroupApproveData || {};
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30 mb-12  w-full px-[1.8rem] py-[1.2rem]';
  return (
    <>
      <ModalLayout title="그룹 초대" closeClick={closeClick}>
        <ModalFormBorder className="mt-16 h-[51.4rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 py-12">
          <div className="mb-20 flex items-center gap-4 text-[1.8rem] font-bold">
            그룹에 추가되었습니다!
          </div>
          <p className={`${formTextSize} mb-[1.6rem]`}>그룹 게시자</p>
          <div className="mb-12 flex items-center gap-4">
            <>
              <img
                src={user?.imageUrl}
                alt="profile"
                className="h-[2.4rem] w-[2.4rem] rounded-[9999px]"
              />
              <p className=" text-[1.4rem]">{user?.name}</p>
            </>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <p className={`${formTextSize}`}>그룹이름</p>
            <div className={`${inputTextSize} ${borderStyle}`}>{name}</div>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <p className={`${formTextSize}`}>그룹 설명</p>
            <div className={`${inputTextSize} ${borderStyle}`}>{description}</div>
          </div>
          <p className={`${formTextSize}`}>날짜 (시작-종료)</p>
          <div className=" mb-12 mt-[0.9rem] flex items-center gap-2">
            <div
              className={`${formTextSize} flex w-full items-center  justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem]`}
            >
              <p>{startDate}</p>
              <img src={calender} alt="캘린더" />
            </div>
            <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
            <div
              className={`${formTextSize} flex w-full items-center  justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem]`}
            >
              <p>{endDate}</p>
              <img src={calender} alt="캘린더" />
            </div>
          </div>
        </ModalFormBorder>
        <div className="mt-12 flex gap-[1.7rem]">
          <TextButton buttonSize="md" color="white" onClick={handleDeleteClick}>
            거부
          </TextButton>
          <TextButton
            buttonSize="md"
            onClick={() => {
              openModal(({ close }) => <AfterApproval closeClick={close} memberId={memberId} />);
              handleGroupApproveClick;
            }}
          >
            승인
          </TextButton>
        </div>
      </ModalLayout>
    </>
  );
}
