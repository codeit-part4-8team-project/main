import Close from '@/assets/images/Close.svg';
import userImg from '@/assets/images/userImgNull.svg';

interface MemberProfileProps {
  // wrong?: () => void;
  wrong?: any;
  getMemberId?: any;
}

function MemberProfile({ wrong, getMemberId }: MemberProfileProps) {
  const TextStyles = 'text-[#D8D8D8] text-[1.4rem] mt-5';
  const { grade, name, profileImg, role } = getMemberId;

  const handleMemberEdit = () => {
    console.log('Edit Button Click!');
  };
  return (
    <div className="fixed right-4 top-0 z-10 flex size-full  items-center justify-center bg-black bg-opacity-5">
      <div className="h-[48.5rem] w-[48.2rem] border-[0.1rem] border-[#DCDCDC] bg-[#FFF] pl-8 pr-12 pt-[1.8rem]">
        <div className="mb-[4.5rem] flex items-center justify-between text-[1.6rem]">
          프로필
          <button onClick={wrong}>
            <img src={Close} alt="CloseImg" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          {profileImg !== 'null' ? <div>해당 이미지</div> : <img src={userImg} alt="userBigImg" />}

          <div className="mb-[4rem] mt-12 flex items-center gap-[0.9rem] text-[2rem]">
            {name}
            <button>
              <p className="text-base text-[#D8D8D8]" onClick={handleMemberEdit}>
                수정
              </p>
            </button>
          </div>
          <div className={`${TextStyles}`}>{grade}</div>
          <div className={`${TextStyles}`}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
