import { IconProps } from '@/types/iconProps';

function Check2CircleIcon({ fill, className, ...props }: IconProps) {
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
        d="M11.996 5C8.1321 5 5 8.1339 5 12C5 15.8661 8.1321 19 11.996 19C15.5499 19 18.533 16.3344 18.9486 12.8316C18.9934 12.4473 18.7198 12.0896 18.3357 12.0434C17.9524 11.9986 17.5942 12.2723 17.5494 12.6566C17.2171 15.4566 14.8391 17.6 11.996 17.6C8.90516 17.6 6.3992 15.0926 6.3992 12C6.3992 8.9074 8.90516 6.4 11.996 6.4C12.6417 6.4 13.2811 6.5169 13.8765 6.7283C14.2403 6.8571 14.6216 6.6548 14.751 6.2908C14.8797 5.9261 14.6992 5.52291 14.3354 5.39341C13.5911 5.12951 12.8012 5 11.996 5ZM18.2924 6.4C18.1133 6.4 17.9258 6.463 17.7894 6.5967L11.6896 12.6125C11.5098 12.7896 11.3286 12.7553 11.1872 12.5467L10.4876 11.5184C10.2736 11.2027 9.82443 11.111 9.50401 11.3217C9.1829 11.5324 9.09265 11.9685 9.30673 12.2842L10.0063 13.3125C10.6367 14.2428 11.87 14.366 12.6739 13.575L18.7954 7.58159C19.0682 7.31279 19.0682 6.8655 18.7954 6.5967C18.6589 6.4623 18.4715 6.4 18.2924 6.4Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default Check2CircleIcon;
