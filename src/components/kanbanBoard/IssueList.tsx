import NoCard from '@/components/common/NoCard';
import ProfileStack from '@/components/common/ProfileStack';
import ColorChipIcon from '@/assets/ColorChipIcon';
import ProfileIcon from '@/assets/ProfileIcon';

// const profiles = [ProfileImg, ProfileImg, ProfileImg];

export default function IssueList() {
  const hasCard = true;

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
          <ColorChipIcon />
          <div className="text-body4-bold text-gray100">코드잇 프로젝트</div>
        </div>
        <span className="text-body4-regular leading-[1.6rem] text-gray50">
          프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.
        </span>
      </div>
      <button className="absolute right-8 top-8"></button>
      <button className="absolute bottom-8 left-8 flex items-center justify-center rounded-[4rem] border border-gray50 px-4 py-[0.6rem] text-body5-regular text-gray50">
        간단한 자기소개
      </button>
      <div className="absolute bottom-8 right-8">
        <ProfileIcon size="sm" />
        {/* <ProfileStack profileImgs={profiles} /> */}
      </div>
    </div>
  );
}
