import { useRef, useState } from 'react';
import dropDown from '../../../../public/assets/arrow-down-dark.png';
import profile from '../../../../public/assets/profile-large.svg';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import Role from '@/components/common/modal/Role';
import { useAxios } from '@/hooks/useAxios';
import { Member } from '@/types/teamTypes';

interface AfterApprovalProps {
  closeClick?: () => void;
  members?: Member[] | [];
  teamId?: number;
}

interface RoleDataType {
  role: string;
  name: string;
}

export default function AfterApproval({
  members = [],
  closeClick,
  teamId = 1,
}: AfterApprovalProps) {
  const { data: roleData } = useAxios<RoleDataType[]>(
    {
      path: 'member/role',
    },
    true,
  );
  const { fetchData: groupPatchRoleData } = useAxios({});
  const [roleToggle, setRoleToggle] = useState<boolean>(false);
  const [roleClickData, setRoleClickData] = useState<string>('');
  const handleroleToggle = () => {
    setRoleToggle(!roleToggle);
  };
  const handlegroupPutRoleData = () => {
    groupPatchRoleData({
      newPath: `member/invite/${teamId}`,
      newMethod: 'PATCH',
      newData: roleClickData,
    });
  };

  const handleRoleClick = (data: string) => {
    console.log('roleclick test', data);
    setRoleClickData(data);
  };

  return (
    <ModalLayout title="그룹초대" closeClick={closeClick}>
      <ModalFormBorder className="mb-16 mt-16 flex h-full w-[41.7rem] flex-col items-center rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pb-[10.8rem] pt-12">
        <h3 className="mb-[1.2rem] text-body1-bold">승인이 완료 되었습니다!</h3>
        <p className="mb-32 text-body3-regular text-gray80">팀 내 나의 역할을 선택해주세요.</p>
        <div className="mb-[1.6rem] h-48 w-48 rounded-[20rem] border-[0.1rem] border-gray100">
          <img src={members[0]?.imageUrl} alt="profile" className="size-full rounded-[20rem]" />
        </div>
        <p className="text-body3-regular">#{members[0]?.username}</p>
        <div className="mb-[0.8rem] flex w-full text-body3-medium">나의역할</div>
        <div className=" relative flex w-full items-center justify-between rounded-[0.6rem] border-[0.1rem] border-gray30 px-[1.8rem] py-[1.2rem] text-body3-regular text-gray50">
          {roleClickData ? (
            <p className="text-black">{roleClickData}</p>
          ) : (
            <p>역할을 선택해 주세요.</p>
          )}
          <button onClick={handleroleToggle}>
            <img src={dropDown} />

            {roleToggle && roleData && <Role roleData={roleData} onClick={handleRoleClick} />}
          </button>
        </div>
      </ModalFormBorder>
      <TextButton buttonSize="md" onClick={handlegroupPutRoleData}>
        완료
      </TextButton>
    </ModalLayout>
  );
}
