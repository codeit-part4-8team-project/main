import { IconProps } from '@/types/iconProps';

export default function KakaoIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_1384_4752)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.50004 0.466797C3.63381 0.466797 0.5 2.88799 0.5 5.87413C0.5 7.73126 1.7121 9.36844 3.55786 10.3422L2.78125 13.1792C2.71264 13.4299 2.99933 13.6297 3.21948 13.4844L6.62374 11.2376C6.91102 11.2653 7.20297 11.2815 7.50004 11.2815C11.366 11.2815 14.5 8.86043 14.5 5.87413C14.5 2.88799 11.366 0.466797 7.50004 0.466797Z"
          fill={fill || 'black'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1384_4752">
          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
