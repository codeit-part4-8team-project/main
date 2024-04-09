import { useAxios } from '@/hooks/useAxios';

interface GroupList {
  onClick: (data: groupDataType) => void;
}

interface groupDataType {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function GroupList({ onClick }: GroupList) {
  const { data: groupData } = useAxios<groupDataType[]>(
    {
      path: 'team/',
    },
    true,
  );
  console.log(groupData);
  return (
    <div className="absolute right-0 top-20 z-50 w-full rounded-[0.6rem] border-[0.1rem] border-gray30 bg-white text-gray100">
      {groupData?.map((group, index) => (
        <div>
          <button
            type="button"
            className="w-full px-[1.8rem] py-[1.2rem] text-start hover:bg-gray10"
            key={index}
            onClick={() => onClick(group)}
          >
            <div className="flex items-center justify-between">
              <p
                style={{ background: group.color }}
                className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
              ></p>
              <p>{group.name}</p>
              {/* <p>{group.description}</p> */}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
