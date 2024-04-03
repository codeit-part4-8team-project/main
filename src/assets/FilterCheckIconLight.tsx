import { IconProps } from '@/types/iconProps';

function FilterCheckIconLight({ fill, className, ...props }: IconProps) {
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
      <mask id="path-1-inside-1_434_1895" fill="white">
        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" />
      </mask>
      <path
        d="M18.5 12C18.5 15.5899 15.5899 18.5 12 18.5V21.5C17.2467 21.5 21.5 17.2467 21.5 12H18.5ZM12 18.5C8.41015 18.5 5.5 15.5899 5.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V18.5ZM5.5 12C5.5 8.41015 8.41015 5.5 12 5.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H5.5ZM12 5.5C15.5899 5.5 18.5 8.41015 18.5 12H21.5C21.5 6.75329 17.2467 2.5 12 2.5V5.5Z"
        fill={fill || '#E7E7E7'}
        mask="url(#path-1-inside-1_434_1895)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6708 9.17729C15.3748 8.88752 14.8949 8.88752 14.599 9.17729L11.0408 12.6607L9.36169 11.2203C9.0473 10.9506 8.5685 10.9822 8.29225 11.2908L8.14776 11.4523C7.87152 11.7609 7.90245 12.2297 8.21684 12.4994L11.1318 14.9999L11.2995 14.8126L15.8273 10.3799C16.1233 10.0901 16.1233 9.6203 15.8273 9.33053L15.6708 9.17729Z"
        fill={fill || '#E7E7E7'}
      />
    </svg>
  );
}
export default FilterCheckIconLight;
