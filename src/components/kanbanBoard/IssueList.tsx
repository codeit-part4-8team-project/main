import CheckIcon from '../../../public/assets/check-circle-dark.svg';
import GreenDop from '../../../public/assets/green-dot.svg';
import ProfileImg from '../../../public/assets/profile-small.svg';
import NoCard from '../common/NoCard';
import ProfileStack from '../common/ProfileStack';

const profiles = [ProfileImg, ProfileImg, ProfileImg];

export default function IssueList() {
  const hasCard = false;

  return (
    <div className="flex h-full flex-col gap-[1.5rem] overflow-scroll pb-12">
      {hasCard ? (
        <>
          <IssueItem />
          <IssueItem />
          <IssueItem />
          <IssueItem />
        </>
      ) : (
        <NoCard backgroundColor="[#F6F6F6]">이슈가 없습니다.</NoCard>
      )}
    </div>
  );
}

function IssueItem() {
  return (
    <div className="relative min-h-64 rounded-[2.4rem] border border-gray30 bg-white p-8">
      <div className="flex flex-col gap-[1.2rem]">
        <div className="flex items-center gap-4">
          <img src={GreenDop} />
          <div className="text-body4-bold text-gray100">코드잇 프로젝트</div>
        </div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">
          프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.
        </span>
      </div>
      <button className="absolute right-8 top-8">
        <img src={CheckIcon} alt="체크 아이콘" />
      </button>
      <button className="text-body5-regular absolute bottom-8 left-8 flex items-center justify-center rounded-[4rem] border border-gray50 px-4 py-[0.6rem] text-gray50">
        간단한 자기소개
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileStack profileImgs={profiles} />
      </div>
    </div>
  );
}
