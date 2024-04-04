import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalMemberList from '@/components/common/modal/ModalMemberList';
import { defaultInstance, useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

interface IssuesModalProps {
  closeClick: () => void;
  issueId: number;
  teamId: number;
}

interface Inputs {
  title: string;
  content: string;
  assignedMembersUsernames: string[];
}

interface dataType {
  Grade?: string;
  bio?: string;
  id?: number;
  imageUrl?: string;
  name?: string;
  provider?: string;
  username?: string;
}

interface MemberListType {
  id: number;
  name: string;
  imageUrl: string;
  role?: string;
  grade: string;
  username: string;
  createdDate: string;
}
interface defaultValue {
  content?: string;
  title?: string;
  assignedMembersUsernames?: dataType[];
  author?: Author;
}
// 여기도 합칠때 지우기 에러
export default function MyIssuesModal({ closeClick, issueId, teamId }: IssuesModalProps) {
  const { data: defaultValue } = useAxios(
    {
      path: `issue/${issueId}`,
    },
    true,
  );
  const { fetchData: deleteData } = useAxios({});

  const {
    content: defaultContent,
    title: defaultTitle,
    assignedMembersUsernames: defaultAssignedMembersUsernames,
    author,
  }: defaultValue = defaultValue || {};
  const { fetchData: fetchPatchData } = useAxios({});

  const [membersList, setMemberList] = useState<MemberListType[]>([]);

  const { register, watch, handleSubmit, getValues, reset } = useForm<Inputs>({
    defaultValues: {
      title: defaultTitle,
      content: defaultContent,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ title, content }, event) => {
    const patchIssue = {
      title: title,
      content: content,
      assignedMembersUsernames: membersList.map((member) => member.username), // 배열 타입에러 자꾸남
    };
    handlePatchIssues(patchIssue);
    event?.target.closest('dialog').close();
  };

  const titleWatch = watch('title');
  const contentWatch = watch('content');
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleGetTeamMemberList = async () => {
    const userName = getValues('assignedMembersUsernames');
    const res = await defaultInstance.get(`member/${teamId}/search?username=${userName}`);
    console.log('res.data입니다', res.data);
    if (res.data) {
      const newMember = res.data;
      setMemberList((prevMembers) => [...prevMembers, ...newMember]);
    }
  };

  const handlePatchIssues = (data: Inputs) => {
    fetchPatchData({
      newPath: `/issue/${issueId}`,
      newMethod: 'PATCH',
      newData: data,
    });
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('이 이슈를 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteData({
        newPath: `issue/${issueId}`,
        newMethod: 'DELETE',
      });
    }
  };

  useEffect(() => {
    reset();
  }, [defaultValue]);
  return (
    <ModalLayout
      title="할 일"
      closeClick={closeClick}
      detail={true}
      deleteOnClick={handleDeleteClick}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[64rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자 (나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img
              src={author?.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[99rem]"
            />
            <p className=" text-[1.4rem]">{author?.username}</p>
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="title" label="이슈*" className={`${formTextSize}`} />
            <ModalInput
              defaultValue={defaultTitle}
              name="title"
              id="title"
              hookform={register('title')}
              placeholder="이슈를 작성해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {titleWatch?.length > 20 && (
            <div className="absolute text-point_red">
              <p>20자 이하로 입력해 주세요.</p>
            </div>
          )}
          {titleWatch ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{titleWatch?.length}/20</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
          )}
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="content" label="내용*" className={`${formTextSize}`} />
            <ModalInput
              defaultValue={defaultContent}
              name="content"
              id="content"
              hookform={register('content')}
              placeholder="해당 이슈의 내용을 작성해 주세요."
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {contentWatch?.length > 20 && (
            <div className="absolute text-point_red">
              <p>20자 이하로 입력해 주세요.</p>
            </div>
          )}
          {contentWatch ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{contentWatch?.length}/40</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/40</p>
          )}
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel
              label="팀원 태그"
              className={`${formTextSize}`}
              htmlFor="assignedMembersUsernames"
            />
            <div className="flex items-center gap-[1.2rem]">
              <ModalInput
                name="assignedMembersUsernames"
                hookform={register('assignedMembersUsernames')}
                type="text"
                placeholder="닉네임을 검색해 주세요."
                id="assignedMembersUsernames"
                className={`${inputTextSize} ${borderStyle} `}
              />
              <TextButton buttonSize="sm" onClick={handleGetTeamMemberList} type="button">
                태그하기
              </TextButton>
            </div>
          </div>
          <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p>
          <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]">
            <ModalMemberList memberData={defaultAssignedMembersUsernames} owner={author} />
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          수정하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
