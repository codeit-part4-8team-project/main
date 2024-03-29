import { IconProps } from '@/types/iconProps';

function FilterCheckIconDark({ ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
        fill="#292929"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6708 9.17729C15.3748 8.88752 14.8949 8.88752 14.599 9.17729L11.0408 12.6607L9.36169 11.2203C9.0473 10.9506 8.5685 10.9822 8.29225 11.2908L8.14776 11.4523C7.87152 11.7609 7.90245 12.2297 8.21684 12.4994L11.1318 14.9999L11.2995 14.8126L15.8273 10.3799C16.1233 10.0901 16.1233 9.6203 15.8273 9.33053L15.6708 9.17729Z"
        fill="white"
      />
    </svg>
  );
}
export default FilterCheckIconDark;
