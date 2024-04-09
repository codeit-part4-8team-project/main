import { IconProps } from '@/types/iconProps';

function MeatbollsIcon({ fill, className, ...props }: IconProps) {
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
      <circle cx="12" cy="7" r="1" fill={fill || '#292929'} />
      <circle cx="12" cy="12" r="1" fill={fill || '#292929'} />
      <circle cx="12" cy="17" r="1" fill={fill || '#292929'} />
    </svg>
  );
}

export default MeatbollsIcon;
