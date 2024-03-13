interface ModalLabelProps {
  htmlFor?: string;
  label?: string;
  className?: string;
}
function ModalLabel({ htmlFor, label, className }: ModalLabelProps) {
  return (
    <label htmlFor={`${htmlFor}`} className={`${className}`}>
      {label}
    </label>
  );
}
export default ModalLabel;
