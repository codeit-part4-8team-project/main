import { SubmitHandler, useForm } from 'react-hook-form';
import Comment from '@/components/common/modal/Comment';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';
import comment from '@/assets/assets/comment.svg';

// 나중에 좋아요 타입 삭제하기
interface FreeBoardDetailProps {
  closeClick: () => void;
  postId: number;
  liked: boolean;
  likeCount: number;
}

interface DefalutVauleType {
  author?: Author;
  content?: string;
  createdDate?: string;
  title?: string;
}
// interface Inputs {
//   content: string;
// }

export default function FreeBoardDetail({ closeClick, postId }: FreeBoardDetailProps) {
  const { data: defaultValue } = useAxios<DefalutVauleType>(
    {
      path: `post/${postId}`,
    },
    true,
  );

  // const { fetchData: commentFetch } = useAxios({});

  // const { handleSubmit, register } = useForm<Inputs>({});

  // const onSubmit: SubmitHandler<Inputs> = ({ content }) => {
  //   const createComment = {
  //     content: content,
  //   };
  //   handleCommentPost(createComment);
  // };
  // const formTextSize = 'text-body3-medium';
  // const inputTextSize = 'text-body3-regular';
  // const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  const { author, content, createdDate }: DefalutVauleType = defaultValue || {};
  const cutDateString = createdDate?.substring(0, 10);

  // const handleCommentPost = (data: Inputs) => {
  //   commentFetch({
  //     newPath: `comment/post/${postId}`,
  //     newMethod: 'POST',
  //     newData: data,
  //   });
  // };

  return (
    <ModalLayout title="자유게시판" closeClick={closeClick} className="w-[57.7rem]">
      <div className="mx-[2.4rem]">
        <div className="mb-[2.4rem] mt-16 flex gap-[1.5rem]">
          <img
            src={author?.imageUrl}
            alt="팀관리자이미지"
            className="h-[3.6rem] w-[3.6rem] rounded-[999rem]"
          />
          <div>
            <p className="text-body4-regular">{author?.name}</p>
            <p className="text-body4-regular text-gray50">{cutDateString}</p>
          </div>
        </div>
        <p className="mb-[2.4rem] text-body4-regular">{content}</p>

        <Comment postId={postId} />

        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[0.8rem] mt-[2.4rem] flex flex-col gap-[0.8rem]">
            <ModalLabel htmlFor="content" label="댓글" className={`${formTextSize}`} />
            <ModalInput
              hookform={register('content')}
              placeholder="댓글을 입력해 주세요."
              id="content"
              name="content"
              className={`${inputTextSize} ${borderStyle}`}
            />
          </div>
          <p className="mb-[2.4rem] flex justify-end text-gray50">0/20</p>
        <Comment postId={postId} />
        </form> */}
      </div>
    </ModalLayout>
  );
}
