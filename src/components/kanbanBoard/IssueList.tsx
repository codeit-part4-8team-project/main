import CheckIcon from '../../../public/assets/check-circle-dark.svg';
import GreenDop from '../../../public/assets/green-dot.svg';
import ProfileImg from '../../../public/assets/profile-small.svg';
import ProfileStack from '../common/ProfileStack';

const profiles = [ProfileImg, ProfileImg, ProfileImg];

function IssueItem() {
  return (
    <div className="relative rounded-[2.4rem] border border-[#E5E5E5] bg-white p-8">
      <div className="flex flex-col gap-[1.2rem]">
        <div className="flex items-center gap-4">
          <img src={GreenDop} />
          <div className="text-[1.2rem] font-bold text-[#292929]">코드잇 프로젝트</div>
        </div>
        <span className="text-[1.2rem] font-normal leading-[1.6rem] text-[#A1A1A1]">
          프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.
        </span>
      </div>
      <button className="absolute right-8 top-8">
        <img src={CheckIcon} alt="체크 아이콘" />
      </button>
      <button className="text-4 absolute bottom-8 left-8 flex items-center justify-center rounded-[4rem] border border-[#A1A1A1] px-4 py-[0.6rem] text-[#A1A1A1]">
        간단한 자기소개
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileStack profileImgs={profiles} />
      </div>
    </div>
  );
}

export default function IssueList() {
  return (
    <div className="flex flex-col gap-[1.5rem] overflow-scroll">
      <IssueItem />
      <IssueItem />
      <IssueItem />
      <IssueItem />
    </div>
  );
}
