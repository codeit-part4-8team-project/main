import { IconProps } from '@/types/iconProps';

function InviteIcon({ fill, className, ...props }: IconProps) {
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
      <path
        d="M12 15V13.6667C12 12.9594 11.691 12.2811 11.1408 11.781C10.5907 11.281 9.84464 11 9.06667 11H3.93333C3.15536 11 2.40926 11.281 1.85915 11.781C1.30905 12.2811 1 12.9594 1 13.6667V15"
        stroke={fill || '#292929'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8C7.88071 8 9 6.88071 9 5.5C9 4.11929 7.88071 3 6.5 3C5.11929 3 4 4.11929 4 5.5C4 6.88071 5.11929 8 6.5 8Z"
        stroke={fill || '#292929'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6665 6.6665V11.6665"
        stroke={fill || '#292929'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1665 9.1665H14.1665"
        stroke={fill || '#292929'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default InviteIcon;
