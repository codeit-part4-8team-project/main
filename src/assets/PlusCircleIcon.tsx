import { IconProps } from '@/types/iconProps';

function PlusCircleIcon({ fill, className, ...props }: IconProps) {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.2002 9.60002C11.2002 9.1582 11.5584 8.80002 12.0002 8.80002C12.442 8.80002 12.8002 9.15819 12.8002 9.60002V11.2002H14.4002C14.842 11.2002 15.2002 11.5584 15.2002 12.0002C15.2002 12.442 14.842 12.8002 14.4002 12.8002H12.8002V14.4C12.8002 14.8418 12.442 15.2 12.0002 15.2C11.5584 15.2 11.2002 14.8418 11.2002 14.4V12.8002H9.6002C9.15837 12.8002 8.8002 12.442 8.8002 12.0002C8.8002 11.5584 9.15837 11.2002 9.6002 11.2002H11.2002V9.60002Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default PlusCircleIcon;
