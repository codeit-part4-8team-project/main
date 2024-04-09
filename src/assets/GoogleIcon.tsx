import { IconProps } from '@/types/iconProps';

export default function GoogleIcon({ className, ...props }: IconProps) {
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
      <g clipPath="url(#clip0_1384_4744)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.22 7.15887C14.22 6.6625 14.1755 6.18523 14.0927 5.72705H7.5V8.43478H11.2673C11.105 9.30978 10.6118 10.0511 9.87045 10.5475V12.3039H12.1327C13.4564 11.0852 14.22 9.29069 14.22 7.15887Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.50008 14.0001C9.39008 14.0001 10.9746 13.3733 12.1328 12.3042L9.87054 10.5478C9.24372 10.9678 8.4419 11.216 7.50008 11.216C5.6769 11.216 4.13372 9.98462 3.58327 8.33008H1.24463V10.1437C2.39645 12.4314 4.76372 14.0001 7.50008 14.0001Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.58318 8.33008C3.44318 7.91008 3.36364 7.46145 3.36364 7.00008C3.36364 6.53872 3.44318 6.09008 3.58318 5.67008V3.85645H1.24455C0.770454 4.80145 0.5 5.87054 0.5 7.00008C0.5 8.12963 0.770454 9.19872 1.24455 10.1437L3.58318 8.33008Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.50008 2.78409C8.52781 2.78409 9.45054 3.13727 10.176 3.83091L12.1837 1.82318C10.9714 0.693636 9.3869 0 7.50008 0C4.76372 0 2.39645 1.56864 1.24463 3.85636L3.58327 5.67C4.13372 4.01545 5.6769 2.78409 7.50008 2.78409Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_1384_4744">
          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
