import { ReactNode } from 'react';

function Board({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-[2.4rem] bg-gray10 p-12 shadow-[0px_0px_5px_0px_rgba(17,17,17,0.1)]">
      {children}
    </div>
  );
}

export default Board;
