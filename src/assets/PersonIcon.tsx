import { IconProps } from '@/types/iconProps';

function PersonIcon({ fill, className, ...props }: IconProps) {
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
        d="M8.82692 12.6201C7.13391 13.251 6 14.7968 6 16.5001V18.1668C6 18.6268 6.41326 19.0001 6.92308 19.0001H17.0769C17.5867 19.0001 18 18.6268 18 18.1668V16.5001C18 14.8368 16.8598 13.3285 15.1731 12.6718C14.9357 12.5793 14.659 12.5768 14.4231 12.6718C13.6063 13.0026 12.8106 13.1668 12 13.1668C11.1921 13.1668 10.3937 12.9935 9.54812 12.646C9.3156 12.5501 9.06305 12.5318 8.82692 12.6201Z"
        fill={fill || '#292929'}
      />
      <circle cx="12" cy="8" r="4" fill="#292929" />
    </svg>
  );
}

export default PersonIcon;
