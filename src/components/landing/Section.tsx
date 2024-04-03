import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <div className="h-[60rem] w-[120rem] rounded-[0.8rem] bg-[#171717]">{children}</div>;
}
