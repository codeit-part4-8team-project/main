import { IconProps } from '@/types/iconProps';

export default function SendIcon({ fill, className, ...props }: IconProps) {
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
      <g clip-path="url(#clip0_3062_2559)">
        <path
          d="M18.3332 1.66602L9.1665 10.8327"
          stroke={fill || '#A1A1A1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3332 1.66602L12.4998 18.3327L9.1665 10.8327L1.6665 7.49935L18.3332 1.66602Z"
          stroke={fill || '#A1A1A1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3062_2559">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
