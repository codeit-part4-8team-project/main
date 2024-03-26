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
  data?: dataType[] | null;
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
export default function ModalMemberList({ formTextSize, data }: ModalMemberListProps) {
  console.log(data);
  // const { Grade, imageUrl, name } = data || {};
  return (
    <>
      {data?.map((item: dataType, index: number) => (
        <div key={index} className="flex items-center gap-[1.6rem] text-body4-regular">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="profile" className="h-[2.4rem] w-[2.4rem] rounded-full" />
          ) : (
            <img src={profile} alt="profile" />
          )}

          <div className="flex w-full items-center justify-between">
            <p>{item.name}</p>
            {item.Grade ? (
              <p className=" text-[#A1A1A1]">{item.Grade}</p>
            ) : (
              <p className=" text-[#A1A1A1]">담당</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
