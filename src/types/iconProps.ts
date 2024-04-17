import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}
