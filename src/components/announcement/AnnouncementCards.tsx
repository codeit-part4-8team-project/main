import checkIcon from '../../../public/check.svg';
import circleIcon from '../../../public/circle.svg';
import closedIcon from '../../../public/closed.svg';
import profileImg from '../../../public/profile.svg';

function AnnouncementCard() {
  return (
    <div className="flex h-fit w-[41.2rem] flex-col gap-[1.8rem] bg-[#D9D9D9] p-[2.2rem]">
      <div className="flex justify-between">
        <div className="flex gap-[0.8rem]">
          <img src={circleIcon} alt="동그라미 아이콘" />
          <span className="text-[1.4rem] font-bold">팀 1</span>
        </div>
        <div className="flex gap-[0.8rem]">
          <img src={checkIcon} alt="체크 표시 아이콘" />
          <img src={closedIcon} alt="닫힘 표시 아이콘" />
        </div>
      </div>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore vero rem omnis recusandae
        pariatur laborum, aliquid quaerat deserunt at consectetur sequi totam reprehenderit
        temporibus libero id minima! Quasi, debitis quos? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi officiis distinctio aperiam. Fugiat inventore, illum quisquam
        corporis libero earum voluptatum tenetur laboriosam commodi error. Error, sequi. Commodi
        unde enim ad. Optio ipsum voluptates distinctio inventore vitae fugit sed sapiente ullam?
        Accusamus quidem necessitatibus quo, suscipit non esse atque fugit distinctio earum, aliquam
        ipsa illo? Nihil laudantium distinctio quo obcaecati animi! Corrupti, nostrum voluptatibus
        mollitia nobis assumenda officiis sunt laborum culpa pariatur veniam ad quod explicabo
        architecto ex eos corporis. Impedit maiores corrupti soluta cumque iure, iste ratione amet
        recusandae repudiandae.
      </span>
      <div className="flex justify-between text-[1rem] text-[#969696]">
        <span>2024-02-03</span>
        <div className="flex gap-[0.8rem]">
          <span>태그된 사람</span>
          <div className="flex">
            <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
            <img className="mr-[-10px]" src={profileImg} alt="프로필 이미지" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnnouncementCards() {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <AnnouncementCard />
      <AnnouncementCard />
      <AnnouncementCard />
    </div>
  );
}
