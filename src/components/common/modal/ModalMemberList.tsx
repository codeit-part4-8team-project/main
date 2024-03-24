import profile from '../../../../public/profile.svg';

interface dataType {
  bio?: string;
  id?: number;
  imageUrl?: string;
  name?: string;
  provider?: string;
  username?: string;
}

interface ModalMemberListProps {
  formTextSize?: string;
  data?: dataType | null;
}
// bio: null
// id: 3
// imageUrl: "http://k.kakaocdn.net/dn/OlB0F/btsCywvxhyP/OkfbKViJeYEeDmImgIpcb0/img_640x640.jpg"
// name: "필겸"
// oauthId: "3403899247"
// provider: "KAKAO"
// username: "user-GCTfTuL3Te"
export default function ModalMemberList({ formTextSize, data }: ModalMemberListProps) {
  const { bio, imageUrl, name } = data || {};
  return (
    <>
      {/* <p className={`${formTextSize} mb-[0.8rem] mt-12`}>팀원</p> */}
      {/* <div className=" h-[10.6rem] w-full rounded-[0.6rem] bg-[#F7F7F7] pl-[1.6rem] pr-[2.8rem] pt-[1.6rem]"> */}
      <div className="flex items-center gap-[1.6rem] text-body4-regular">
        {imageUrl ? (
          <img src={imageUrl} alt="profile" className="h-[2.4rem] w-[2.4rem] rounded-full" />
        ) : (
          <img src={profile} alt="profile" />
        )}

        <div className="flex w-full items-center justify-between">
          <p>{name}</p>
          {bio ? <p className=" text-[#A1A1A1]">{bio}</p> : <p className=" text-[#A1A1A1]">담당</p>}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
