import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { defaultInstance, useAxios } from '@/hooks/useAxios';

interface GroupMemberInviteModalProps {
  closeClick: () => void;
  teamId: number;
}

interface Inputs {
  username?: string;
}

interface dataType {
  bio: string;
  id: number;
  imageUrl: string;
  name: string;
  provider: string;
  username: string;
}

export default function GroupMemberInviteModal({
  closeClick,
  teamId,
}: GroupMemberInviteModalProps) {
  const { register, handleSubmit, getValues } = useForm<Inputs>();
  const { fetchData: groupMemberCreate } = useAxios({});

  // const [membersList, setMembersList] = useState<dataType[]>([]);
  const [member, setMember] = useState<dataType | null>(null);
  const [memberCheck, setMemberCheck] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = () => {
    // const createMember = {
    //   members: membersList.map((member) => member.username),
    // };
    const createMember = {
      username: member?.username,
    };
    handleMemberCreate(createMember);
  };
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  // 나중에 멤버그걸로 교체
  const handleMemberCreate = (data: Inputs) => {
    groupMemberCreate({
      newPath: `/member/${teamId}`,
      newMethod: 'POST',
      newData: data,
    });
  };

  const handleGetMembers = async () => {
    const userName = getValues('username');
    const res = await defaultInstance.get(`/user/search?username=${userName}`);
    if (res.data !== '') {
      const newMember = res.data;
      console.log(res.data);
      // 새로운 팀원을 기존 팀원 목록에 추가
      setMemberCheck(false);
      setMember(newMember);
    } else if (res.data === '') {
      setMemberCheck(true);
    }
  };

  const handleRemoveMember = () => {
    setMember(null);
  };

  return (
    <ModalLayout title="그룹 초대" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[31rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel label="팀원 초대" className={`${formTextSize}`} htmlFor="members" />
            <div className="flex items-center gap-[1.2rem]">
              <ModalInput
                name="username"
                hookform={register('username')}
                type="text"
                placeholder="닉네임을 검색해 주세요."
                id="username"
                className={`${inputTextSize} ${borderStyle} `}
              >
                {memberCheck && (
                  <p className="absolute mt-[0.5rem] text-body5-medium text-point_red">
                    검색하신유저가없습니다.
                  </p>
                )}
              </ModalInput>
              <TextButton buttonSize="sm" onClick={handleGetMembers} type="button">
                검색하기
              </TextButton>
            </div>
          </div>

          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full overflow-scroll rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {member && <ModalMemberList member={member} onClick={handleRemoveMember} />}
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          초대하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
