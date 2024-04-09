import { IconProps } from '@/types/iconProps';

function DragHandleIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <rect x="7" y="4" width="2" height="2" fill={fill || '#A1A1A1'} />
      <rect x="11" y="4" width="2" height="2" fill={fill || '#A1A1A1'} />
      <rect x="7" y="9" width="2" height="2" fill={fill || '#A1A1A1'} />
      <rect x="11" y="9" width="2" height="2" fill={fill || '#A1A1A1'} />
      <rect x="7" y="14" width="2" height="2" fill={fill || '#A1A1A1'} />
      <rect x="11" y="14" width="2" height="2" fill={fill || '#A1A1A1'} />
    </svg>
  );
}

export default DragHandleIcon;
