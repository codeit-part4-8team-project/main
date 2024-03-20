import { IconProps } from '@/types/iconProps';

function Sliders3Icon({ fill, className, ...props }: IconProps) {
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
        d="M14.3333 5C13.3471 5 12.4278 5.64712 12.1408 6.55712L5.77778 6.55556C5.34844 6.55556 5 6.904 5 7.33333C5 7.76267 5.34844 8.11111 5.77778 8.11111L12.1408 8.11035C12.4892 9.06313 13.3471 9.66667 14.3333 9.66667C15.3196 9.66667 16.186 9.06158 16.5407 8.10413L18.2222 8.11111C18.6516 8.11111 19 7.76267 19 7.33333C19 6.904 18.6516 6.55556 18.2222 6.55556H16.5344C16.1595 5.60744 15.3196 5 14.3333 5ZM9.66667 9.66667C8.64156 9.66667 7.78366 10.3045 7.47022 11.2238C7.36055 11.2308 5.77778 11.2222 5.77778 11.2222C5.34844 11.2222 5 11.5707 5 12C5 12.4293 5.34844 12.7778 5.77778 12.7778C5.77778 12.7778 7.37377 12.7614 7.47333 12.7716C7.78677 13.6909 8.64156 14.3333 9.66667 14.3333C10.6529 14.3333 11.4976 13.729 11.867 12.7801L18.2222 12.7778C18.6516 12.7778 19 12.4293 19 12C19 11.5707 18.6516 11.2222 18.2222 11.2222L11.8631 11.2152C11.5224 10.2874 10.6529 9.66667 9.66667 9.66667ZM14.3333 14.3333C13.3471 14.3333 12.4449 14.9828 12.14 15.8811L5.77778 15.8889C5.34844 15.8889 5 16.2373 5 16.6667C5 17.096 5.34844 17.4444 5.77778 17.4444L12.1291 17.4452C12.4511 18.3669 13.3471 19 14.3333 19C15.3196 19 16.1697 18.3832 16.5438 17.4452L18.2222 17.4444C18.6516 17.4444 19 17.096 19 16.6667C19 16.2373 18.6516 15.8889 18.2222 15.8889L16.5368 15.8842C16.2016 14.9641 15.3196 14.3333 14.3333 14.3333Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default Sliders3Icon;