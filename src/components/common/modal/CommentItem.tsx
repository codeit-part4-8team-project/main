import { Author } from '@/types/commonTypes';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

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
    <div className="mb-[3rem] flex flex-col gap-[1.6rem] ">
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
  );
}
