import { SubmitHandler, useForm } from 'react-hook-form';
import ModalInput from '@/components/common/modal/ModalInput';
import ReplyItem from '@/components/common/modal/ReplyItem';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

interface Inputs {
  content: string;
}

interface MentionType {
  username: string;
}
interface ReplyType {
  mention: MentionType;
  id: number;
  content: string;
  createdDate: string;
  author: Author;
}

interface CommentReplyProps {
  commentId: number;
  reply: ReplyType[];
}

interface replyDataType {
  reply: ReplyType[];
}

export default function CommentReply({ commentId, reply }: CommentReplyProps) {
  const { data: replyData, fetchData: replyFetch } = useAxios<replyDataType>({});
  const { handleSubmit, register, watch, reset } = useForm<Inputs>({});

  const onSubmit: SubmitHandler<Inputs> = ({ content }) => {
    const createComment = {
      content: content,
    };
    handleCommentReply(createComment);
    reset();
  };

  const handleCommentReply = async (data: Inputs) => {
    await replyFetch({
      newPath: `comment/reply/${commentId}`,
      newMethod: 'POST',
      newData: data,
    });
  };
  return (
    <div className="pl-[10.4rem] pr-[6.4rem]">
      {replyData ? (
        <>
          {replyData.reply.map((item) => (
            <ReplyItem key={item.id} item={item} />
          ))}
        </>
      ) : (
        <>
          {reply.map((item) => (
            <ReplyItem item={item} key={item.id} />
          ))}
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          hookform={register('content')}
          placeholder="댓글을 입력해 주세요"
          id="content"
          name="content"
          className=" w-[35.1rem] "
          divClassName="flex gap-4 justify-between"
        >
          <button className="flex h-[2.8rem] w-[7.1rem] items-center justify-center rounded-[0.6rem] border-[0.1rem] border-gray30 bg-white px-[1.2rem] py-[1.8rem] text-center">
            전송
          </button>
        </ModalInput>
        {watch('content')?.length > 100 && (
          <div className="absolute text-point_red">
            <p>100자 이하로 입력해 주세요.</p>
          </div>
        )}
        {watch('content') ? (
          <p className=" mb-[2.4rem] flex justify-end text-gray50">
            {watch('content')?.length}/100
          </p>
        ) : (
          <p className=" mb-[2.4rem] flex justify-end text-gray50">0/100</p>
        )}
      </form>
    </div>
  );
}
