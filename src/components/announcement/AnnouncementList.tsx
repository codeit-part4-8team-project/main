import NoCard from '@/components/common/NoCard';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import { Announcement } from '@/types/announcementTypes';
import { Team } from '@/types/teamTypes';
import MegaphoneIcon from '@/assets/MegaphoneIcon';

interface AnnouncementListProps {
  announcements: Announcement[];
  team?: Team;
}

const mockData: Announcement[] = [
  {
    id: 4,
    title: '비처럼 음악처럼 가사 외우기',
    author: {
      name: 'Jisun Park',
      imageUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocKAkjsP8-sxX03y5NBRrvdnX3db_LgN82rjrp5bqGfn=s96-c',
      role: null,
      grade: 'OWNER',
      username: 'jishanshan',
      createdDate: '2024-03-27',
    },
    content:
      '비가 내리고 음악이 흐르면 난 당신을 생각해요 당신이 떠나시던 그밤에 이렇게 비가 왔어요 비가 내리고 음악이 흐르면 난 당신을 생각해요 당신이 떠나시던 그밤에 이렇게 비가 왔어요 난 오늘도 이 비를 맞으며 하루를 그냥 보내요 오 아름다운 음악같은 우리에 사랑의 이야기들은 흐르는 비처럼 너무 아프기 때문이죠 -간주중- ',
    createdDate: '2024-03-27 23:12:11',
    pinned: false,
    edited: false,
  },
  {
    id: 3,
    title: '비처럼 음악처럼 가사 외우기',
    author: {
      name: 'Jisun Park',
      imageUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocKAkjsP8-sxX03y5NBRrvdnX3db_LgN82rjrp5bqGfn=s96-c',
      role: null,
      grade: 'OWNER',
      username: 'jishanshan',
      createdDate: '2024-03-27',
    },
    content:
      '비가 내리고 음악이 흐르면 난 당신을 생각해요 당신이 떠나시던 그밤에 이렇게 비가 왔어요 비가 내리고 음악이 흐르면 난 당신을 생각해요 당신이 떠나시던 그밤에 이렇게 비가 왔어요 난 오늘도 이 비를 맞으며 하루를 그냥 보내요 오 아름다운 음악같은 우리에 사랑의 이야기들은 흐르는 비처럼 너무 아프기 때문이죠 -간주중- ',
    createdDate: '2024-03-27 22:43:06',
    pinned: false,
    edited: false,
  },
  {
    id: 2,
    title: '밤양갱 가사 외우기',
    author: {
      name: 'Jisun Park',
      imageUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocKAkjsP8-sxX03y5NBRrvdnX3db_LgN82rjrp5bqGfn=s96-c',
      role: null,
      grade: 'OWNER',
      username: 'jishanshan',
      createdDate: '2024-03-27',
    },
    content:
      '떠나는 길에 니가 내게 말했지. 너는 바라는 게 너무나 많아. 잠깐이라도 널 안 바라보면 머리에 불이 나버린다니까 나는 흐르려는 눈물을 참고 하려던 얘길 어렵게 누르고 그래 미안해 라는 한 마디로 너랑 나눈 날들 마무리했었지 달디달고 달디달고 달디단 밤양갱 밤양갱 내가 먹고 싶었던 건 달디단 밤양갱 밤양갱이야 떠나는 길에 니가 내게 말했지 너는 바라는 게 너무나 많아 아냐 내가 늘 바란 건 하나야',
    createdDate: '2024-03-27 22:42:51',
    pinned: false,
    edited: false,
  },
  {
    id: 1,
    title: '밤양갱 가사 외우기',
    author: {
      name: 'Jisun Park',
      imageUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocKAkjsP8-sxX03y5NBRrvdnX3db_LgN82rjrp5bqGfn=s96-c',
      role: null,
      grade: 'OWNER',
      username: 'jishanshan',
      createdDate: '2024-03-27',
    },
    content:
      '떠나는 길에 니가 내게 말했지. 너는 바라는 게 너무나 많아. 잠깐이라도 널 안 바라보면 머리에 불이 나버린다니까 나는 흐르려는 눈물을 참고 하려던 얘길 어렵게 누르고 그래 미안해 라는 한 마디로 너랑 나눈 날들 마무리했었지 달디달고 달디달고 달디단 밤양갱 밤양갱 내가 먹고 싶었던 건 달디단 밤양갱 밤양갱이야 떠나는 길에 니가 내게 말했지 너는 바라는 게 너무나 많아 아냐 내가 늘 바란 건 하나야',
    createdDate: '2024-03-27 22:40:56',
    pinned: false,
    edited: false,
  },
];

/* 유저/팀의 대시보드 페이지에서 사용하는 공지글 리스트 */
export default function AnnouncementList({ announcements, team }: AnnouncementListProps) {
  announcements = mockData; /* TODO 지우기 */

  return (
    <div className="row-span-2 mt-[3.6rem] flex h-full w-full flex-col gap-[2.6rem]">
      <div className="flex gap-4">
        <MegaphoneIcon />
        <span className="text-body2-regular">
          새로운 공지사항이 총 <span className="font-extrabold">{announcements.length}</span>건이
          있습니다.
        </span>
      </div>
      <div className="h-full w-full overflow-scroll">
        {announcements.length !== 0 ? (
          <li className="flex list-none flex-col gap-[2.4rem]">
            {announcements.map((announcement) => {
              return (
                <ul>
                  <AnnouncementItem announcement={announcement} team={team} />
                </ul>
              );
            })}
          </li>
        ) : (
          <NoCard backgroundColor="bg-white">공지사항이 없습니다.</NoCard>
        )}
      </div>
    </div>
  );
}
