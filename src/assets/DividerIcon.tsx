import { IconProps } from '@/types/iconProps';

function DividerIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="14"
      viewBox="0 0 2 14"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M1 0V14" stroke={fill || '#E5E5E5'} />
    </svg>
  );
}

export default DividerIcon;
