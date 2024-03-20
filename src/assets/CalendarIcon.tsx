import { IconProps } from '@/types/iconProps';

function CalendarIcon({ active, fill, className, ...props }: IconProps) {
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
      {active ? (
        <path
          d="M8 2C7.448 2 7 2.42442 7 2.94737C4.791 2.94737 3 4.64411 3 6.73684V7.74296L21 7.68421V6.73684C21 4.64411 19.209 2.94737 17 2.94737C17 2.42442 16.552 2 16 2C15.448 2 15 2.42442 15 2.94737H9C9 2.42442 8.552 2 8 2ZM3 9.57895V16.2105C3 18.3033 4.791 20 7 20H17C19.209 20 21 18.3033 21 16.2105V9.57895H3Z"
          fill={fill || '#292929'}
        />
      ) : (
        <path
          d="M8.02235 2C7.4713 2 7.02407 2.42442 7.02407 2.94737C4.81688 2.94737 3 4.646 3 6.73684V8.63158L3.03095 16.2105C3.03095 18.3004 4.81887 20 7.02407 20H17.0069C19.2121 20 21 18.3033 21 16.2105L20.969 8.63158V6.73684C20.969 4.64221 19.2101 2.94737 17.0069 2.94737C17.0069 2.42442 16.5606 2 16.0086 2C15.4575 2 15.0103 2.42442 15.0103 2.94737H9.02064C9.02064 2.42442 8.5744 2 8.02235 2ZM7.02407 4.84211C7.02407 5.36505 7.4713 5.78947 8.02235 5.78947C8.5744 5.78947 9.02064 5.36505 9.02064 4.84211H15.0103C15.0103 5.36505 15.4575 5.78947 16.0086 5.78947C16.5606 5.78947 17.0069 5.36505 17.0069 4.84211C18.102 4.84211 18.9725 5.68337 18.9725 6.73684V7.68421C17.0518 7.68421 6.91725 7.68421 4.99656 7.68421V6.73684C4.99656 5.69758 5.91399 4.84211 7.02407 4.84211ZM4.99656 9.57895C6.91725 9.57895 17.0518 9.57895 18.9725 9.57895L19.0034 16.2105C19.0034 17.2536 18.11 18.1053 17.0069 18.1053H7.02407C5.92197 18.1053 5.02751 17.2574 5.02751 16.2105L4.99656 9.57895Z"
          fill={fill || 'white'}
        />
      )}
    </svg>
  );
}

export default CalendarIcon;