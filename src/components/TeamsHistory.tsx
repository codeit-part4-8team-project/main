import { ReactNode } from 'react';

interface TeamsHistoryProps {
  children: ReactNode;
}

function TeamsHistory({ children }: TeamsHistoryProps) {
  return (
    <div className="mb-6 flex justify-between border-[0.1rem] border-solid py-[2.3rem] pl-[3.1rem] pr-[2.3rem] text-[1.6rem]">
      {children}
    </div>
  );
}

export default TeamsHistory;
