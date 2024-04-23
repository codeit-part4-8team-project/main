import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import TextButton from '../TextButton';
import ModalFormBorder from './ModalFormBorder';
import ModalInput from './ModalInput';
import ModalLabel from './ModalLabel';
import ModalLayout from './ModalLayout';
import ModalMemberList from './ModalMemberList';
import { dataType } from '@/components/Modal/GroupModal';
import { defaultInstance, useAxios } from '@/hooks/useAxios';

interface ProfileModalProps {
  closeClick?: () => void;
  onClick?: () => void;
}
interface Inputs {
  name: string;
  description: string;
  members?: string[];
  color?: string;
  startDate?: string;
  endDate?: string;
  githubLink?: string;
  discordLink?: string;
  figmaLink?: string;
}

export default function ProfileModal({ closeClick, onClick }: ProfileModalProps) {
  const { register, getValues, handleSubmit } = useForm<Inputs>();
  const { fetchData: groupFetch } = useAxios({});
  const onSubmit: SubmitHandler<Inputs> = ({ name, description }, event) => {
    const createChat = {
      name: name,
      description: description,
      members: membersList.map((member) => member.username),
    };

    try {
      handleGroup(createChat);
      event?.target.closest('dialog').close();
    } catch (error) {
      console.log(error);
    }
  };
  const handleGroup = (data: Inputs) => {
    const { name, description, members } = data;
    groupFetch({
      newPath: '/team/',
      newMethod: 'POST',
      newData: {
        name,
        description,
        members,
      },
    }).then(() => window.location.reload());
  };
  const [membersList, setMembersList] = useState<dataType[]>([]);
  const [memberCheck, setMemberCheck] = useState(false);

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  //임시로 해 둔것 백엔드에서 생성되면 데이터 바꾸고 수정해야 함
  const handleGetMembers = async () => {
    const userName = getValues('members');
    const res = await defaultInstance.get(`/user/search?username=${userName}`);
    if (res.data !== '') {
      const newMember = res.data;
      // 새로운 팀원을 기존 팀원 목록에 추가
      setMemberCheck(false);
      setMembersList((prevMembers) => [...prevMembers, newMember]);
    } else if (res.data === '') {
      setMemberCheck(true);
    }
  };

  const handleRemoveMember = (userName: string | undefined) => {
    setMembersList((prevMembers) => prevMembers.filter((member) => member.username !== userName));
  };
  return (
    <ModalLayout title="채팅방 생성하기" closeClick={closeClick} onClick={onClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-full w-[41.7rem]  rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
          <ModalLabel label="팀원 초대" className={`${formTextSize}`} htmlFor="members" />
          <div className="flex items-center gap-[1.2rem]">
            <ModalInput
              name="members"
              hookform={register('members')}
              type="text"
              placeholder="닉네임을 검색해 주세요."
              id="mebers"
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
          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full overflow-scroll rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            {membersList && (
              <ModalMemberList onClick={handleRemoveMember} memberData={membersList} />
            )}
          </div>
        </ModalFormBorder>
      </form>
      <TextButton buttonSize="md" className="mt-16">
        채팅방 생성하기
      </TextButton>
    </ModalLayout>
  );
}
