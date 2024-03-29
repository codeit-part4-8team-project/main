import close from '../../../../public/assets/close.svg';
import profile from '../../../../public/profile.svg';

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
  formTextSize?: string;
  data?: dataType[];
  onClick: (userName: string | undefined) => void;
}
// -> 값이 다름
// -> 이거는 그룹 생성할때임
// bio: null
// id: 3
// imageUrl: "http://k.kakaocdn.net/dn/OlB0F/btsCywvxhyP/OkfbKViJeYEeDmImgIpcb0/img_640x640.jpg"
// name: "필겸"
// oauthId: "3403899247"
// provider: "KAKAO"
// username: "user-GCTfTuL3Te"OWNER("소유자"),

// MANAGER("매니저"),
// TEAM_MEMBER("팀원");
// Grade

// OWNER("소유자"),
// MANAGER("매니저"),
// TEAM_MEMBER("팀원");

// Role

// BACKEND("백엔드"),
// FRONTEND("프론트엔드"),
// DESIGNER("디자이너");

// -> 그룹 member 형식 값 같음
// "members": [
//   {
//     "name": "string",
//     "imageUrl": "string",
//     "role": "string", -> 이게 담당이 뭔지 나타내는 것
//     "grade": "string",
//     "username": "string"
//   }
// ]

// -> 이슈 member 형식
// "assignedMembers": [
//   {
//     "name": "string",
//     "imageUrl": "string",
//     "role": "string",
//     "grade": "string",
//     "username": "string"
//   }
// ],

// bio: "하이"
// id: 2
// imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocKAkjsP8-sxX03y5NBRrvdnX3db_LgN82rjrp5bqGfn=s96-c"
// name: "지선"
// oauthId: "116721616327443781715"
// provider: "GOOGLE"
// username: "jishanshan"
export default function ModalMemberList({ data, onClick }: ModalMemberListProps) {
  console.log(data);
  return (
    <>
      {data?.map((item: dataType, index: number) => (
        <div key={index} className="mb-[0.8rem] flex items-center gap-[1.6rem]  text-body4-regular">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="profile" className="h-[2.4rem] w-[2.4rem] rounded-full" />
          ) : (
            <img src={profile} alt="profile" />
          )}

          <div className="flex w-full items-center justify-between">
            <p>{item.name}</p>
            <button type="button" onClick={() => onClick(item.username)}>
              <img alt="close" src={close} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
