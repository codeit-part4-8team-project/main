import { Author } from '@/types/commonTypes';
import close from '@/assets/assets/close.svg';

interface dataType {
  Grade?: string;
  bio?: string;
  id?: number;
  imageUrl?: string;
  name?: string;
  provider?: string;
  username?: string;
}

interface ModalMemberListProps {
  memberData?: dataType[];
  onClick?: (userName: string | undefined) => void;
  owner?: Author;
}

export default function ModalMemberList({ memberData, onClick, owner }: ModalMemberListProps) {
  const memberListItem =
    'mb-[0.8rem] flex items-center gap-[1.6rem]  text-body4-regular text-body4-regular';
  return (
    <>
      {owner && (
        <div className={memberListItem}>
          <img
            src={owner?.imageUrl}
            alt="ownerProfile"
            className="h-[2.4rem] w-[2.4rem] rounded-full"
          />
          <div className="flex w-full items-center justify-between">
            <p>{owner?.username}</p>
            <p className="text-gray50">{owner?.grade}</p>
          </div>
        </div>
      )}

      {memberData?.map((item: dataType, index: number) => (
        <div key={index} className={memberListItem}>
          <img src={item.imageUrl} alt="profile" className="h-[2.4rem] w-[2.4rem] rounded-full" />
          <div className="flex w-full items-center justify-between">
            <p>{item.username}</p>
            {onClick ? (
              <button type="button" onClick={() => onClick(item.username)}>
                <img alt="close" src={close} />
              </button>
            ) : (
              <p className="text-gray50">{item.Grade}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
