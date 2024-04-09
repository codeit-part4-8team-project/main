import { IconProps } from '@/types/iconProps';

function ColorChipIcon({ fill, className, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="6" fill={fill || '#1FCF6A'} />
    </svg>
  );
}

export default ColorChipIcon;
