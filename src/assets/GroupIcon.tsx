import { IconProps } from '@/types/iconProps';

function GroupIcon({ className, ...props }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_921_1222)">
        <circle cx="18" cy="18" r="18" fill="#5F5F5F" fill-opacity="0.1" />
        <path
          d="M18.0001 10C15.2374 10 13.3334 11.9584 13.3334 14.8C13.3334 15.188 13.3334 15.6 13.3334 16.4C13.3334 17.2 13.2074 17.632 12.7742 18C12.7252 18.0416 12.5199 18.2232 12.4584 18.2752C11.4746 19.112 10.9916 19.896 11.0001 21.2C11.0063 22.0624 11.6947 22.8088 12.5557 22.8H15.8153C15.8153 22.8 15.6667 23.2888 15.6667 23.6C15.6667 24.9256 16.7113 26 18.0001 26C19.2888 26 20.3334 24.9256 20.3334 23.6C20.3334 23.2888 20.191 22.8 20.191 22.8H23.4445C24.3031 22.8024 24.9992 22.0672 25 21.2C25.0016 19.9056 24.5131 19.108 23.5417 18.2752C23.4779 18.22 23.2523 18.0432 23.2018 18C22.7779 17.6368 22.6667 17.2 22.6667 16.4C22.6667 15.4 22.6667 14.8 22.6667 14.8C22.6667 11.9584 20.7627 10 18.0001 10ZM18.0001 22.8C18.4294 22.8 18.7778 23.1584 18.7778 23.6C18.7778 24.0416 18.4294 24.4 18.0001 24.4C17.5707 24.4 17.2223 24.0416 17.2223 23.6C17.2223 23.1584 17.5707 22.8 18.0001 22.8Z"
          fill="#292929"
        />
        <circle cx="25.5" cy="7.5" r="1.5" fill="#D9D9D9" />
      </g>
      <defs>
        <clipPath id="clip0_921_1222">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default GroupIcon;
