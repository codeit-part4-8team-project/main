import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentReply from '@/components/common/modal/CommentReply';
import ModalInput from '@/components/common/modal/ModalInput';
import PostLike from '@/components/Post/PostLike';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';
import Edit from '@/assets/assets/Edit.svg';
import DeleteTrash from '@/assets/assets/Trash.svg';
import comment from '@/assets/assets/comment.svg';

interface ReplyType {
  id: number;
  content: string;
  createdDate: string;
  author: Author;
  mention: MentionType;
}

interface Inputs {
  content: string;
}

interface MentionType {
  username: string;
}

interface ContentType {
  reply: ReplyType[];
  author: Author;
  content: string;
  createdDate: string;
  id: number;
  liked: boolean;
  likeCount: number;
}

interface PatchDataType {
  content: string;
}

interface CommentItemProps {
  item: ContentType;
  handleCommentDelete: (id: number) => void;
}

export default function CommentItem({ item, handleCommentDelete }: CommentItemProps) {
  const { data: patchData, fetchData: patchFetch } = useAxios<PatchDataType>({});
  const [openReply, setOpenReply] = useState(false);
  const [commentEdit, setCommentEdit] = useState<boolean>(false);

  const { handleSubmit, register } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ content }) => {
    const patchComment = {
      content: content,
    };

    handleCommentPatch(patchComment);
  };

  const openCommentEdit = () => {
    setCommentEdit(!commentEdit);
  };

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleCommentPatch = (data: Inputs) => {
    const commentId = item.id;
    patchFetch({
      newPath: `comment/${commentId}`,
      newMethod: 'PATCH',
      newData: data,
    });
    setCommentEdit(false);
  };

  return (
    <>
      <div className="flex flex-col gap-[1.6rem] px-[6.4rem]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <img
              src={item.author.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
            />
            <p className="text-body4-regular">{item.author.username}</p>
            <p className="text-body5-regular text-gray50">{item.createdDate}</p>
          </div>
          <div className="flex gap-[1.6rem]">
            <button onClick={openCommentEdit} type="button">
              <img src={Edit} alt={Edit} />
            </button>
            <button type="button" onClick={() => handleCommentDelete(item.id)}>
              <img src={DeleteTrash} alt="DeleteTrash" />
            </button>
          </div>
        </div>
        {!commentEdit ? (
          <>
            {patchData ? (
              <p className=" px-[3.4rem] pb-[0.8rem] text-body4-regular">{patchData.content}</p>
            ) : (
              <p className=" px-[3.4rem] pb-[0.8rem] text-body4-regular">{item.content}</p>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex w-full justify-between gap-4">
              <ModalInput
                hookform={register('content')}
                placeholder="댓글을 입력해 주세요"
                defaultValue={item.content}
                id="content"
                name="content"
                className="rounded-[0.6rem] border-[0.1rem] border-gray30 text-body4-regular"
              />
              <button className="flex  w-[7.1rem] items-center justify-center rounded-[0.6rem] border-[0.1rem] border-gray30 bg-white px-[1.8rem] py-[1.2rem] text-center">
                변경
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="flex items-center px-[6.4rem] pb-8 ">
        <div className="mr-[0.4rem] flex items-center text-body4-regular text-gray50">
          <img src={comment} alt="comment" />
          <p>{item.reply.length}</p>
        </div>
        <div className="mr-[1.6rem]">
          <PostLike commentId={item.id} liked={item.liked} likeCount={item.likeCount} />
        </div>

        <button type="button" onClick={handleOpenReply}>
          {openReply ? (
            <p className="text-body5-bold">취소</p>
          ) : (
            <p className="text-body5-bold">답글</p>
          )}
        </button>
      </div>
      {openReply && <CommentReply commentId={item.id} reply={item.reply} />}
    </>
  );
}
