interface ModalLinkInputProps {
  onClick: () => void;
}

export default function ModalCreateLinkInput({ onClick }: ModalLinkInputProps) {
  return (
    <div className="text-gray50 text-body5-bold mb-[0.8rem] flex justify-end">
      <button type="button" onClick={onClick}>
        +항목추가하기
      </button>
    </div>
  );
}
