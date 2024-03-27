import { LegacyRef, MouseEventHandler } from 'react';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalUrlToggle from '@/components/Modal/ModalUrlToggle';

interface ModalLinkInput {
  urlToggleRef: LegacyRef<HTMLButtonElement> | undefined;
  borderStyle: string;
  inputTextSize: string;
  handleUrlClick: () => void;
  urlImg: string | null;
  github: string;
  discord: string;
  figma: string;
  urlToggle: boolean;
  handleUrlImgClick: MouseEventHandler<HTMLDivElement>;
  arrowDown: string;
  hookform: any;
  name: 'githubLink' | 'discordLink' | 'figmaLink';
}

export default function ModalLinkInput({
  urlToggleRef,
  borderStyle,
  inputTextSize,
  handleUrlClick,
  urlImg,
  github,
  discord,
  figma,
  urlToggle,
  handleUrlImgClick,
  arrowDown,
  hookform,
  name,
}: ModalLinkInput) {
  return (
    <div className="mb-[0.8rem] mt-[1.6rem] flex gap-[1.6rem]">
      <button
        ref={urlToggleRef}
        className={`${borderStyle} relative flex  items-center justify-center gap-[0.4rem] px-[1.8rem] py-[1.2rem]`}
        onClick={handleUrlClick}
      >
        {urlImg === null ? <img src={github} alt="깃허브로고" /> : <img src={urlImg} alt="로고" />}
        <img src={arrowDown} alt="토글버튼" />
        {urlToggle && (
          <ModalUrlToggle
            onClick={handleUrlImgClick}
            discord={discord}
            figma={figma}
            github={github}
          />
          // 나중에 컴포넌트로 분리

          // 여기까지
        )}
      </button>
      <ModalInput
        hookform={hookform}
        name={name}
        id="link"
        className={`${inputTextSize} ${borderStyle}`}
        placeholder="URL을 입력해 주세요."
      />
    </div>
  );
}
