import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

interface Inputs {
  title: string;
  content: string;
}

interface DefaultValueType {
  title?: string;
  content?: string;
  author?: Author;
}
interface AnnouncementModalProps {
  closeClick: () => void;
  teamId: number;
}
// 여기도 합칠때 에러 처리하기
export default function AnnouncementEditModal({ closeClick, teamId }: AnnouncementModalProps) {
  const { data: defaultValue } = useAxios<DefaultValueType>(
    {
      path: `announcement/${teamId}`,
    },
    true,
  );

  const {
    title: defaultTitle,
    content: defaultContent,
    author,
  }: DefaultValueType = defaultValue || {};

  const { fetchData: patchData } = useAxios({});
  const { register, watch, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title: defaultTitle,
      content: defaultContent,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ content, title }, event) => {
    const createAnnouncement = {
      content: content,
      title: title,
    };
    handlePatchAnnouncement(createAnnouncement);
    event?.target.closest('dialog').close();
  };

  const formTextSize = 'text-body3-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const inputTextSize = 'text-body3-regular';

  const handlePatchAnnouncement = (data: Inputs) => {
    patchData({
      newPath: `announcement/${teamId}`,
      newMethod: 'PATCH',
      newData: data,
    });
  };

  useEffect(() => {
    reset();
  }, [defaultValue]);

  return (
    <ModalLayout title="공지사항 게시하기" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-16 flex items-center gap-4">
          <img
            src={author?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[99rem]"
          />
          <p className=" text-[1.4rem]">{author?.username}</p>
        </div>
        <div>
          <ModalLabel htmlFor="title" label="제목" className={`${formTextSize}`} />
          <ModalInput
            defaultValue={defaultTitle}
            hookform={register('title')}
            id="title"
            name="title"
            className={`${inputTextSize} ${borderStyle}`}
            placeholder="제목을 입력해 주세요."
          />
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="내용" className={`${formTextSize}`} />
          <textarea
            defaultValue={defaultContent}
            {...register('content')}
            placeholder="내용을 입력해 주세요."
            id="content"
            name="content"
            className={`h-[23.8rem] w-[38.1rem] px-[1.8rem] pb-[1.2rem] pt-[1.8rem] ${borderStyle} mb-[0.8rem] text-body3-regular`}
            maxLength={200}
          />
        </div>
        {watch('content') ? (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('content').length}/200</p>
        ) : (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">0/200</p>
        )}
        <TextButton buttonSize="md" className="">
          편집하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
