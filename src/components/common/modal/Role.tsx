interface RoleDataType {
  role: string;
  name: string;
}

interface RoleProps {
  roleData: RoleDataType[];
  onClick: (data: string) => void;
}

export default function Role({ roleData, onClick }: RoleProps) {
  return (
    <div className="absolute right-0 top-20 z-50 w-full rounded-[0.6rem] border-[0.1rem] border-gray30 bg-white text-gray100">
      {roleData?.map((item, index) => (
        <button
          key={index}
          className="w-full px-[1.8rem] py-[1.2rem] text-start hover:bg-gray10"
          onClick={() => onClick(item.name)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
