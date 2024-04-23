import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentItem from '@/components/common/modal/CommentItem';
import CommentPageination from '@/components/common/modal/CommentPageination';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';
import comment from '@/assets/assets/comment.svg';

interface CommentProps {
  postId: number;
  children: ReactNode;
}
interface Inputs {
  content: string;
}
interface ContentType {
  author: Author;
  content: string;
  createdDate: string;
  id: number;
  reply: ReplyType[];
}

interface pageableType {
  pageNumber: number;
}
interface ReplyType {
  id: number;
  content: string;
  createdDate: string;
  author: Author;
  mention: MentionType;
}

interface MentionType {
  username: string;
  // createdDate: string
  // grade: string;
  // imageUrl: string;
  // id: string;
}

interface DefaultValue {
  size?: number;
  content?: ContentType[];
  numberOfElements?: number;
  last?: boolean;
  first?: boolean;
  totalPages?: number;
  totalElements?: number;
  pageable?: pageableType;
}

export default function Comment({ postId, children }: CommentProps) {
  const { data: defaultValue, fetchData: getAxios } = useAxios<DefaultValue>(
    {
      path: `comment/post/${postId}?page=1`,
    },
    true,
  );
  console.log(defaultValue);
  const { fetchData: deleteFetch } = useAxios({});
  const { fetchData: commentFetch } = useAxios({});

  const { content, totalElements, last, first, totalPages, pageable }: DefaultValue =
    defaultValue || {};

  const { handleSubmit, register, watch, reset } = useForm<Inputs>({});
  const [reRending, setReRending] = useState<number | undefined>(0);

  const onSubmit: SubmitHandler<Inputs> = ({ content }) => {
    const createComment = {
      content: content,
    };

    handleCommentPost(createComment);

    reset();
  };

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const handleCommentPost = async (data?: Inputs) => {
    if (data) {
      await commentFetch({
        newPath: `comment/post/${postId}`,
        newMethod: 'POST',
        newData: data,
      });
    }
    if (totalPages === 0) {
      getAxios({
        newPath: `comment/post/${postId}?page=1`,
      });
    } else {
      getAxios({
        newPath: `comment/post/${postId}?page=${totalPages}`,
      });
    }
    setReRending(totalPages);
  };

  const handlePagination = (data: number) => {
    getAxios({
      newPath: `comment/post/${postId}?page=${data}`,
    });
  };

  const handleCommentDelete = async (commentId: number) => {
    const confirmDelete = window.confirm('이 이슈를 삭제하시겠습니까?');
    if (confirmDelete) {
      await deleteFetch({
        newPath: `comment/${commentId}`,
        newMethod: 'DELETE',
      });
    }
    if (pageable) {
      getAxios({
        newPath: `comment/post/${postId}?page=${pageable?.pageNumber + 1}`,
      });
    }
  };

  return (
    <>
      <div className="mx-[2.4rem] px-16  pb-[2.4rem] text-gray50">
        <div className="flex items-center gap-[0.4rem]">
          <img src={comment} alt="comment" />
          <p>{totalElements}</p>
          {children}
        </div>
      </div>
      <div className=" h-full bg-gray10 pt-[2.6rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[0.8rem] flex flex-col gap-[0.8rem] px-[6.4rem]">
            <ModalLabel htmlFor="content" label="댓글" className={`${formTextSize}`} />
            <ModalInput
              hookform={register('content', { maxLength: 100, required: true })}
              placeholder="댓글을 입력해 주세요."
              id="content"
              name="content"
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          {watch('content')?.length > 100 && (
            <div className="absolute px-[6.4rem] text-point_red">
              <p>100자 이하로 입력해 주세요.</p>
            </div>
          )}
          {watch('content') ? (
            <p className=" mb-[2.4rem] flex justify-end px-[6.4rem] text-gray50">
              {watch('content')?.length}/100
            </p>
          ) : (
            <p className=" mb-[2.4rem] flex justify-end px-[6.4rem] text-gray50">0/100</p>
          )}
        </form>
        {content?.map((item) => (
          <CommentItem item={item} key={item.id} handleCommentDelete={handleCommentDelete} />
        ))}
        <CommentPageination
          reRending={reRending}
          totalPages={totalPages}
          onPageChange={handlePagination}
          first={first}
          last={last}
        />
      </div>
    </>
  );
}
