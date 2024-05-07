interface ModalDateCellProps {
  day: Date;
  modalCell: string;
  onClick: (clickedDate: Date) => void;
}

export const ModalDateCell: React.FC<ModalDateCellProps> = ({ day, modalCell, onClick }) => {
  return (
    <div onClick={() => onClick(day)}>
      <p className={modalCell}>{` ${day.getDate()} `}</p>
    </div>
  );
};
