import { IconProps } from '@/types/iconProps';

export interface ProfileIconProps extends IconProps {
  size: 'sm' | 'lg';
}

function ProfileIcon({ className, size, ...props }: ProfileIconProps) {
  return size === 'sm' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#5F5F5F" />
      <mask
        id="mask0_201_696"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <circle cx="12" cy="12" r="12" fill="#4D4D4D" />
      </mask>
      <g mask="url(#mask0_201_696)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9257 12.8402C15.1621 12.1598 15.9999 10.8445 15.9999 9.3335C15.9999 7.12436 14.2091 5.3335 11.9999 5.3335C9.79078 5.3335 7.99992 7.12436 7.99992 9.3335C7.99992 10.8445 8.83771 12.1598 10.0741 12.8402C5.10231 13.7468 1.33325 18.1 1.33325 23.3335C1.33325 29.2245 6.10888 34.0002 11.9999 34.0002C17.891 34.0002 22.6666 29.2245 22.6666 23.3335C22.6666 18.1 18.8975 13.7468 13.9257 12.8402Z"
          fill="#EDEEDC"
        />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="18" cy="18" r="18" fill="#5F5F5F" />
      <mask
        id="mask0_201_706"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <circle cx="18" cy="18" r="18" fill="#4D4D4D" />
      </mask>
      <g mask="url(#mask0_201_706)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.8883 19.2608C22.743 18.2402 23.9999 16.2671 23.9999 14.0005C23.9999 10.6868 21.3136 8.00049 17.9999 8.00049C14.6862 8.00049 11.9999 10.6868 11.9999 14.0005C11.9999 16.2671 13.2567 18.2401 15.1114 19.2608C7.65355 20.6204 1.99976 27.1503 1.99976 35.0007C1.99976 43.8373 9.1632 51.0007 17.9998 51.0007C26.8363 51.0007 33.9998 43.8373 33.9998 35.0007C33.9998 27.1504 28.3461 20.6205 20.8883 19.2608Z"
          fill="#EDEEDC"
        />
      </g>
    </svg>
  );
}

export default ProfileIcon;
