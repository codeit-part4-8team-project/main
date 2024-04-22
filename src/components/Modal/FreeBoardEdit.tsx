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

interface defaultValue {
  author?: Author;
  title?: string;
  content?: string;
}

interface FreeBoardModalProps {
  closeClick: () => void;
  postId: number;
}
// 여기도 합칠때 지우기 에러남
export default function FreeBoardEditModal({ closeClick, postId }: FreeBoardModalProps) {
  const { data: defaultValue } = useAxios<defaultValue>(
    {
      path: `post/${postId}`,
    },
    true,
  );
  const { title: defaultTitle, content: defalutContent, author }: defaultValue = defaultValue || {};
  const { fetchData: freeBoardEditData } = useAxios({});

  const formTextSize = 'text-body3-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const { register, watch, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title: defaultTitle,
      content: defalutContent,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ title, content }, event) => {
    const createFreeBoard = {
      content: content,
      title: title,
    };
    handlePatchFreeBoard(createFreeBoard);
    event?.target.closest('dialog').close();
  };

  const handlePatchFreeBoard = (data: Inputs) => {
    freeBoardEditData({
      newPath: `post/${postId}`,
      newMethod: 'PATCH',
      newData: data,
    });
  };

  useEffect(() => {
    reset();
  }, [defaultValue]);

  return (
    <ModalLayout title="작성하기" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-16 flex items-center gap-4">
          <img
            src={author?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[99rem]"
          />
          <p className=" text-[1.4rem]">{author?.username}</p>
        </div>
        <div className="mb-[0.8rem] flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="title" label="제목" className={`${formTextSize}`} />
          <ModalInput
            defaultValue={defaultTitle}
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
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="내용" className={`${formTextSize}`} />
          <textarea
            defaultValue={defalutContent}
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
        <TextButton buttonSize="md" className="">
          편집하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
