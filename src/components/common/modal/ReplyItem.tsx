import { Author } from '@/types/commonTypes';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

interface ItemType {
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

interface ReplyItemProps {
  item: ItemType;
}

export default function ReplyItem({ item }: ReplyItemProps) {
  console.log(item);
  const { author, content, createdDate, mention } = item;
  //   createdDate: "2024-04-18"
  // grade: "TEAM_MEMBER"
  // id: 8
  // imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocKBuPrK58zOvSMHby2qRJ_jwlfiMvMMknErFI_8ajC_Qeeqpw=s96-c"
  // name: "문필겸"
  // role: null
  // username: "user-nB7K9p2eEC"
  return (
    <>
      <div className="mb-[1.6rem] flex justify-between">
        <div className=" flex gap-4">
          <img
            src={author.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rme] rounded-[999rem]"
          />
          <p className="text-body4-regular">{author.username}</p>
          <p className="text-body5-regular text-gray50">{createdDate}</p>
        </div>
        <button type="button">
          <MeatbollsIcon />
        </button>
      </div>
      <div className="mb-[1.7rem] flex gap-[0.5rem] pl-[3.4rem] text-body4-regular">
        <p className="text-point_red">@{mention.username}</p>
        <p>{content}</p>
      </div>
    </>
  );
}
