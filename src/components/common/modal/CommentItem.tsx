import { useState } from 'react';
import CommentReply from '@/components/common/modal/CommentReply';
// import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';
import HeartIcon from '@/assets/HeartIcon';
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

interface MentionType {
  username: string;
  // createdDate: string
  // grade: string;
  // imageUrl: string;
  // id: string;
}

interface ContentType {
  reply: ReplyType[];
  author: Author;
  content: string;
  createdDate: string;
  id: number;
}

interface CommentItemProps {
  item: ContentType;
  handleCommentDelete: (id: number) => void;
  // handleCommentPatch: (id: number) => void;
}

export default function CommentItem({
  item,
  handleCommentDelete,
  // handleCommentPatch,
}: CommentItemProps) {
  // const { fetchData: patchFetch } = useAxios({});
  const [openReply, setOpenReply] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  // const handleCommentPatch = async (commentId: number, data?: Inputs) => {
  //   console.log(commentId);
  //   patchFetch({
  //     newPath: `comment/${commentId}`,
  //     newMethod: 'PATCH',
  //     newData: data
  //   });
  // };

  console.log(item.reply);
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
            {/* <button type="button" onClick={() => handleCommentPatch(item.id)}> */}
            <img src={Edit} alt={Edit} />
            {/* </button> */}
            <button type="button" onClick={() => handleCommentDelete(item.id)}>
              <img src={DeleteTrash} alt="DeleteTrash" />
            </button>
          </div>
        </div>
        <p className=" px-[3.4rem] pb-[0.8rem] text-body4-regular">{item.content}</p>
      </div>
      <div className="flex items-center px-[6.4rem] pb-8 ">
        <div className="mr-[0.4rem] flex items-center text-body4-regular text-gray50">
          <img src={comment} alt="comment" />
          <p>0</p>
        </div>
        <div className="mr-[1.6rem] flex items-center text-body4-regular text-gray50">
          <HeartIcon />
          <p>0</p>
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
