import MeatbollsIcon from '@/assets/MeatbollsIcon';
import comment from '@/assets/assets/comment.svg';

export default function Comment() {
  return (
    <>
      <div className="mb-[1.6rem] flex justify-between ">
        {/* 해당 댓글 이미지 넣으면 됩니다 */}
        <div className="flex items-center gap-4">
          <img src={comment} alt="profile" />
          {/* userName */}
          <p className="text-body4-regular">userName</p>
          {/* createDate */}
          <p className="text-body5-regular text-gray50">2024-04-05</p>
        </div>
        <button>
          <MeatbollsIcon />
        </button>
      </div>
      {/* content */}
      <p className="px-[3.4rem] text-body4-regular">가나다라마바사아자차카타파하</p>
    </>
  );
}
