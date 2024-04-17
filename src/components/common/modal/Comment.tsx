import { SubmitHandler, useForm } from 'react-hook-form';
import CommentItem from '@/components/common/modal/CommentItem';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';
import comment from '@/assets/assets/comment.svg';

interface CommentProps {
  postId: number;
}

interface Inputs {
  content: string;
}
interface ContentType {
  author: Author;
  content: string;
  createdDate: string;
  id: number;
}
// author: {id: 3, name: '문필겸', imageUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKBuPrK58zOvSMHby2qRJ_jwlfiMvMMknErFI_8ajC_Qeeqpw=s96-c', role: null, grade: 'OWNER', …}
// content: "comment Test"
// createdDate: "2024-04-13 11:51:52"
// deletable: true
// editable: true
// id: 1
// mention: null
// reply: []
interface DefaultValue {
  size?: number;
  content?: ContentType[];
  numberOfElements?: number;
}
// 나중에 페이지네이션으로 page={number}에 number 값 넣기 2군데임 참고
// useState사용
export default function Comment({ postId }: CommentProps) {
  const { data: defaultValue, fetchData: getAxios } = useAxios<DefaultValue>(
    {
      path: `comment/post/${postId}?page=1`,
    },
    true,
  );

  const { fetchData: commentFetch } = useAxios({});
  const { content, numberOfElements }: DefaultValue = defaultValue || {};

  const { handleSubmit, register, watch, reset } = useForm<Inputs>({});

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

  const handleCommentPost = async (data: Inputs) => {
    await commentFetch({
      newPath: `comment/post/${postId}`,
      newMethod: 'POST',
      newData: data,
    });
    getAxios({
      newPath: `comment/post/${postId}?page=1`,
    });
  };

  return (
    <>
      <div className="border-b-[0.1rem]  border-dashed pb-[2.4rem] text-gray50">
        <div className="flex items-center gap-[0.4rem]">
          <img src={comment} alt="comment" />
          <p>{numberOfElements}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[0.8rem] mt-[2.4rem] flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="댓글" className={`${formTextSize}`} />
          {/* 요청 보내고 value 값 비우기 */}
          <ModalInput
            hookform={register('content')}
            placeholder="댓글을 입력해 주세요."
            id="content"
            name="content"
            className={`${inputTextSize} ${borderStyle}`}
          />
        </div>
        {watch('content')?.length > 20 && (
          <div className="absolute text-point_red">
            <p>20자 이하로 입력해 주세요.</p>
          </div>
        )}
        {watch('content') ? (
          <p className=" mb-[2.4rem] flex justify-end text-gray50">{watch('content')?.length}/20</p>
        ) : (
          <p className=" mb-[2.4rem] flex justify-end text-gray50">0/20</p>
        )}

        {content?.map((item) => (
          <>
            <CommentItem item={item} />
          </>
        ))}
      </form>
    </>
  );
}
