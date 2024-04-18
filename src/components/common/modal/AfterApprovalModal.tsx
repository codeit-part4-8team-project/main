import { useState } from 'react';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import Role from '@/components/common/modal/Role';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import dropDown from '@/assets/assets/arrow-down-dark.png';

interface AfterApprovalProps {
  closeClick?: () => void;
  memberId: number;
}

interface RoleDataType {
  role: string;
  name: string;
}
// 합칠때 에러 처리하기
// 여기 작업하기 - 필겸 -
export default function AfterApproval({ closeClick, memberId }: AfterApprovalProps) {
  console.log('membersId입니다', memberId);
  const { data: roleData } = useAxios<RoleDataType[]>(
    {
      path: 'member/role',
    },
    true,
  );
  const { user } = useUserContext();

  const { fetchData: memberRoleData } = useAxios({});
  const [roleToggle, setRoleToggle] = useState<boolean>(false);
  const [roleClickData, setRoleClickData] = useState<string>('');
  console.log(roleClickData);
  const handleroleToggle = () => {
    setRoleToggle(!roleToggle);
  };
  // roleclickData 해결 하기 값 안 넘어감
  // + memberId나중에 백한테 물어보기
  const handleMemberRoleData = () => {
    memberRoleData({
      newPath: `member/${memberId}`,
      newMethod: 'PATCH',
      newData: roleClickData,
    }).then(() => {
      closeClick && closeClick();
    });
  };

  const handleRoleClick = (data: string) => {
    setRoleClickData(data);
  };

  return (
    <ModalLayout title="그룹초대" closeClick={closeClick}>
      <ModalFormBorder className="mb-16 mt-16 flex h-full w-[41.7rem] flex-col items-center rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pb-[10.8rem] pt-12">
        <h3 className="mb-[1.2rem] text-body1-bold">승인이 완료 되었습니다!</h3>
        <p className="mb-32 text-body3-regular text-gray80">팀 내 나의 역할을 선택해주세요.</p>
        <div className="mb-[1.6rem] h-48 w-48 rounded-[20rem] border-[0.1rem] border-gray100">
          <img src={user?.imageUrl} alt="profile" className="size-full rounded-[20rem]" />
        </div>
        <p className="text-body3-regular">#{user?.name}</p>
        <div className="mb-[0.8rem] flex w-full text-body3-medium">나의역할</div>
        <div className=" relative flex w-full items-center justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem] text-body3-regular text-gray50">
          {roleClickData ? (
            <p className="text-black">{roleClickData}</p>
          ) : (
            <p>역할을 선택해 주세요.</p>
          )}
          <button onClick={handleroleToggle}>
            <img src={dropDown} />
          </button>
          {roleToggle && roleData && <Role roleData={roleData} onClick={handleRoleClick} />}
        </div>
      </ModalFormBorder>
      <TextButton buttonSize="md" onClick={handleMemberRoleData}>
        완료
      </TextButton>
    </ModalLayout>
  );
}
