import { IconProps } from '@/types/iconProps';

function PageArrowRightIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M9.75 17.25L14.25 12.25L9.75 7.25" stroke={fill || '#5E5955'} strokeWidth="1.1" />
    </svg>
  );
}

export default PageArrowRightIcon;
