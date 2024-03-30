import { useState } from 'react';
import Mock from '../../public/data/Mock.json';
import Teams from '../../public/data/Teams.json';
import userImgNull from '../../public/images/userImgNull.svg';
import Nav from '@/components/common/Nav';
import TeamsHistory from '@/components/TeamsHistory';

function UserMyPage() {
  const { userData } = Mock;
  const [{ userId, profileImg, nickName, birth }] = userData;
  const [nickNameChange, setNickNameChange] = useState(false);
  const handlenickNameChange = () => {
    console.log('수정버튼클릭');
    setNickNameChange(true);
  };
  const { data } = Teams; // teamsHistory 부분입니다.

  return (
    <>
      <Nav />
      <div className="ml-6 mt-6 flex gap-10">
        <div className=" h-[48.5rem] w-[48.2rem] border-[0.1rem] border-solid pl-8 pt-[1.8rem]">
          <h3 className="text-[1.6rem]">프로필</h3>
          <div className=" flex flex-col  items-center justify-center">
            {profileImg === 'null' ? (
              <div>
                <img src={userImgNull} />
              </div>
            ) : (
              // 이미지를 어떻게 처리할지 의논
              <div>있으면 해당 이미지</div>
            )}
            <div className="mt-11 flex items-center justify-center gap-[0.9rem]">
              <p className="text-[2rem]">{nickName}</p>
              <button>
                <p className="text-[1rem] text-[#D8D8D8]" onClick={handlenickNameChange}>
                  수정
                </p>
              </button>
            </div>
            <div className=" text-2xl flex  flex-col items-center gap-6 text-[#AAAAAA]">
              <p className=" mt-[5.2rem]">프론트 개발자</p>
              <p>{birth}</p>
              <p>{userId}</p>
              <p>+82 10.1234.5678</p>
            </div>
          </div>
        </div>
        <div className="h-[48.5rem] w-[113.2rem] border-[0.1rem] border-solid pl-8 pr-[3.6rem] pt-[1.8rem]">
          <h3 className="mb-[5.3rem] text-[1.4rem]">그룹 히스토리</h3>
          {data.map((teams) => (
            <TeamsHistory>
              <p>{teams.name}</p>
              <p>가입 시기 : {teams.startDate}</p>
            </TeamsHistory>
          ))}
        </div>
      </div>
    </>
  );
}
export default UserMyPage;
