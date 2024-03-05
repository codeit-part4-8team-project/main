import PlusImg from '../../../public/images/Plus.svg';

interface ButtonProps {
  text: string;
  submit?: () => void;
}
function Button({ text, submit }: ButtonProps) {
  return (
    <>
      <button
        className={`${text === '게시' ? 'w-[7.3rem]  border-[1px] border-solid bg-red-400 p-4' : 'w-[10rem] border-[1px] border-solid bg-red-400 p-4'}`}
        onClick={submit}
      >
        <div className="flex items-center gap-2 text-lg">
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
