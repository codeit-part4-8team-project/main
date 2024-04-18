import { Author } from '@/types/commonTypes';
import HeartIcon from '@/assets/HeartIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import comment from '@/assets/assets/comment.svg';

interface ContentType {
  author: Author;
  content: string;
  createdDate: string;
  id: number;
}

interface CommentItemProps {
  item: ContentType;
}

export default function CommentItem({ item }: CommentItemProps) {
  return (
    <>
      <div className="flex flex-col gap-[1.6rem] ">
        <div className="flex justify-between" key={item.id}>
          <div className="flex items-center gap-4">
            <img
              src={item.author.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
            />
            <p className="text-body4-regular">{item.author.username}</p>
            <p className="text-body5-regular text-gray50">{item.createdDate}</p>
          </div>
          <button>
            <MeatbollsIcon />
          </button>
        </div>
        <p className="px-[3.4rem] text-body4-regular">{item.content}</p>
      </div>
      <div className="flex items-center pb-8">
        <div className="mr-[0.4rem] flex items-center text-body4-regular text-gray50">
          <img src={comment} alt="comment" />
          <p>0</p>
        </div>
        <div className="mr-[1.6rem] flex items-center text-body4-regular text-gray50">
          <HeartIcon />
          <p>0</p>
        </div>
        <p className="text-body5-bold">답글</p>
      </div>
    </>
  );
}
