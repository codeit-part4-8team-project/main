import clsx from 'clsx';
import ProfileImg from '@/assets/assets/profile-small.svg';

interface ChatListItemProps {
  isActive?: boolean;
}

export default function ChatListItem({ isActive = false }: ChatListItemProps) {
  return (
    <div
      className={clsx(
        'flex h-[10.3rem] w-[41.7rem] items-center justify-center rounded-[2.4rem] bg-gray20 px-[2.4rem]',
        isActive ? 'bg-gray20' : 'border border-gray20 bg-white',
      )}
    >
      <div className="flex w-full items-center gap-[1.7rem]">
        <img
          src={ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[4.8rem] w-[4.8rem] rounded-full"
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-body3-bold text-gray100">홍길동</span>
            <span className="text-body4-regular text-gray50">PM 04:24</span>
          </div>
          <span className="text-body4-regular text-gray100">
            안녕하세요. 내 이름은 홍길동입니다.
          </span>
        </div>
      </div>
    </div>
  );
}
