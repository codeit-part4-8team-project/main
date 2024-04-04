import PlusImg from '@/assets/images/Plus.svg';

interface ButtonProps {
  text: string;
  submit?: () => void;
}
function Button({ text, submit }: ButtonProps) {
  const buttonStyles = 'border-[1px] border-solid bg-red-400 p-4';
  return (
    <>
      <button
        className={`${text === '게시' ? `w-[7.3rem] ${buttonStyles}` : `w-[10rem] ${buttonStyles}`}`}
        onClick={submit}
      >
        <div className="text-lg flex items-center gap-2">
          <img src={PlusImg} alt="PlusImg" />
          {text}
        </div>
      </button>
    </>
  );
}

export default Button;

// Button 사용법
{
  /* <Button text="일정 생성" submit={해당함수} />
<Button text="이슈 생성" submit={해당함수} />
<Button text="게시" submit={해당함수} /> */
}
