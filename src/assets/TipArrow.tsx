import { IconProps } from '@/types/iconProps';

function TipArrow({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5.2414 7.18722L0.570164 2.18232C-0.0264418 1.5431 0.426839 0.5 1.30122 0.5H10.31C11.167 0.5 11.627 1.50736 11.0657 2.15493L6.72815 7.15983C6.33908 7.60875 5.64674 7.62151 5.2414 7.18722Z"
        fill={fill || '#F3FF00'}
      />
    </svg>
  );
}

export default TipArrow;
