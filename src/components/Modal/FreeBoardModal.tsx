import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import GroupList from '@/components/common/modal/GroupList';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';
import arrowDown from '@/assets/assets/arrow-down-dark.png';

interface Inputs {
  title: string;
  content: string;
}

interface FreeBoardModalProps {
  closeClick: () => void;
  teamId?: string;
  team?: Team;
}

interface groupDataType {
  id: string;
  name: string;
  description: string;
  color: string;
}
// 여기도 합칠때 지우기 에러
export default function FreeBoardModal({ closeClick, teamId, team }: FreeBoardModalProps) {
  const { fetchData: freeBoardFetchData } = useAxios({});
  const { register, watch, handleSubmit } = useForm<Inputs>();
  const { user } = useUserContext();
  const [groupClickData, setGroupClickData] = useState<groupDataType | null>(null);
  const [groupList, setGroupList] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = ({ content, title }, event) => {
    const createFreeBoard = {
      content: content,
      title: title,
    };
    handlePostFreeBoard(createFreeBoard);
    event?.target.closest('dialog').close();
  };

  const handlePostFreeBoard = (data: Inputs) => {
    freeBoardFetchData({
      newPath: `post/${teamId}`,
      newMethod: 'POST',
      newData: data,
    }).then(() => window.location.reload());
  };

  const handleGroupClick = () => {
    setGroupList(!groupList);
  };

  const handleGroupId = (data: groupDataType) => {
    setGroupClickData(data);
  };

  const formTextSize = 'text-body3-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  return (
    <ModalLayout title="작성하기" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-16 flex items-center gap-4">
          <img
            src={user?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
          />
          <p className=" text-[1.4rem]">{user?.name}</p>
        </div>
        <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="title" label="제목" className={`${formTextSize}`} />
          <ModalInput
            placeholder="제목을 작성해 주세요."
            id="title"
            name="title"
            hookform={register('title', { maxLength: 20, required: true })}
            className={`${borderStyle} text-body3-regular`}
          />
        </div>
        {watch('title') ? (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('title').length}/20</p>
        ) : (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
        )}
        <p className={`${formTextSize} mb-[0.8rem]`}>그룹</p>
        {teamId ? (
          <div
            className={`${formTextSize} ${borderStyle} relative w-full px-[1.8rem] py-[1.2rem] `}
          >
            <p>{team?.name}</p>
          </div>
        ) : (
          <div
            className={`${formTextSize} ${borderStyle} relative w-full px-[1.8rem] py-[1.2rem] `}
          >
            {groupClickData ? (
              <div className="flex items-center gap-[3rem]">
                <p
                  className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
                  style={{ background: groupClickData.color }}
                ></p>
                <p className="">{groupClickData.name}</p>
              </div>
            ) : (
              <p className="text-gray50">그룹을 선택해 주세요</p>
            )}

            <button
              className="absolute bottom-0 right-[1.8rem] top-0"
              type="button"
              onClick={handleGroupClick}
            >
              <img src={arrowDown} alt="arrowDown" />
            </button>
            {groupList && <GroupList onClick={handleGroupId} />}
          </div>
        )}
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="내용*" className={`${formTextSize}`} />
          <textarea
            {...register('content')}
            placeholder="내용을 입력해 주세요."
            id="content"
            name="content"
            className={`h-[23.8rem] w-[38.1rem] px-[1.8rem] pb-[1.2rem] pt-[1.8rem] ${borderStyle} mb-[0.8rem] text-body4-regular`}
            maxLength={200}
          />
        </div>
        {watch('content') ? (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('content').length}/200</p>
        ) : (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">0/200</p>
        )}
        <TextButton buttonSize="md" className="mt-16">
          작성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
