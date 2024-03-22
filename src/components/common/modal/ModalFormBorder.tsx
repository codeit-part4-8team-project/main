import { ReactNode } from 'react';

interface ModalFormBorder {
  children: ReactNode;
  className: string;
}

export default function ModalFormBorder({ children, className }: ModalFormBorder) {
  return <div className={`${className}`}>{children}</div>;
}
