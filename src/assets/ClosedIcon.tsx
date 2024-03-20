import { IconProps } from '@/types/iconProps';

function ClosedIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g id="Frame">
        <path
          id="Vector 2 (Stroke)"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 8C3 7.44772 3.44772 7 4 7L12 7C12.5523 7 13 7.44771 13 8C13 8.55228 12.5523 9 12 9L4 9C3.44772 9 3 8.55229 3 8Z"
          fill={fill || '#292929'}
        />
      </g>
    </svg>
  );
}

export default ClosedIcon;
