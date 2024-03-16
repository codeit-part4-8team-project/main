import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import github from '../../../public/assets/Github.svg';
import arrowDown from '../../../public/assets/arrow-down-dark.png';
import discord from '../../../public/assets/discord.svg';
import figma from '../../../public/assets/figma.svg';
import profile from '../../../public/profile.svg';
import ModalColorToggle from '@/components/common/ModalColorToggle';
import ModalLayout from '@/components/common/ModalLayout';
import ModalForm from '@/components/ModalAtuom/ModalForm';
import ModalInput from '@/components/ModalAtuom/ModalInput';
import ModalLabel from '@/components/ModalAtuom/ModalLabel';

interface GroupEditModalProps {
  closeClick: () => void;
}

export default function GroupEditModal({ closeClick }: GroupEditModalProps) {
  const colorToggleRef = useRef<HTMLButtonElement | null>(null);
  const urlToggleRef = useRef<HTMLButtonElement | null>(null);
  const [color, setColor] = useState('');
  const [colorToggle, setColorToggle] = useState(false);
  const [urlToggle, setUrlToggle] = useState(false);
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const handleColorClick = (color: string) => {
    setColor(color);
  };
  console.log(color);

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };
  const handleUrlClick = () => {
    setUrlToggle(!urlToggle);
  };
  const handleUrlImgClick: MouseEventHandler<HTMLImageElement> = (e) => {
    console.log('tttt', e.currentTarget);
    setUrlImg(e.currentTarget.src);
  };

  const handleColorClickOutside = (e: MouseEvent) => {
    if (colorToggleRef.current && !colorToggleRef.current.contains(e.target as Node)) {
      setColorToggle(false);
    }
  };

  const handleUrlClickOutside = (e: MouseEvent) => {
    if (urlToggleRef.current && !urlToggleRef.current.contains(e.target as Node)) {
      setUrlToggle(false);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 동작 방지
    // 나머지 로직 추가
  };

  useEffect(() => {
    if (colorToggle) {
      document.addEventListener('mousedown', handleColorClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleColorClickOutside);
    };
  }, [colorToggle]);

  useEffect(() => {
    if (urlToggle) {
      document.addEventListener('mousedown', handleUrlClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleUrlClickOutside);
    };
  }, [urlToggle]);

  return (
    <>
      <ModalLayout title="그룹 편집" closeClick={closeClick}>
        <ModalForm
          onSubmit={onSubmit}
          hidden={true}
          firstLabel="그룹 이름"
          firstPlaceholder="그룹 이름을 입력해 주세요."
          firstHtmlForId="groupName"
          firstType="text"
          secondLabel="팀원초대"
          secondPlaceholder="닉네임을 검색해 주세요."
          secondHtmlForId="invite"
          secondType="text"
          who="그룹 게시자"
          profile={profile}
          userNickName="#userNickName"
        >
          <div className={`${formTextSize} `}>그룹 컬러 칩</div>
          <div className="mb-12 mt-8 flex items-center gap-12">
            {/* 여기임 */}
            {color ? (
              <div
                className={`h-[4.7rem] w-[4.7rem] rounded-[50%]`}
                style={{ backgroundColor: color }}
              />
            ) : (
              <div className={`h-[4.7rem] w-[4.7rem] rounded-[50%] bg-[#F7F7F7]`} />
            )}

            <button
              onClick={handleColorToggle}
              type="button"
              className="relative w-[10rem]"
              ref={colorToggleRef}
            >
              <div
                className={`${borderStyle} flex cursor-pointer items-center justify-center gap-[0.4rem] px-4 py-[1.2rem] text-xl font-bold`}
              >
                컬러 설정
                <img alt="토글버튼" src={arrowDown} />
              </div>
              {colorToggle && <ModalColorToggle handleColorClick={handleColorClick} />}
            </button>
          </div>
          <ModalLabel htmlFor="date" label="날짜 (시작-종료)" className={`${formTextSize}`} />
          <div className="mb-12 mt-[0.9rem] flex items-center gap-2">
            <ModalInput
              type="date"
              name="date"
              id="date"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="2024년 3월 13일"
            />
            <p className={`${formTextSize} text-[#5F5F5F]`}>-</p>
            <ModalInput
              type="date"
              name="date"
              id="date"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="2024년 3월 13일"
            />
          </div>
          <ModalLabel htmlFor="link" label="외부 연결 링크" className={`${formTextSize}`} />
          <div className="mb-12 mt-[1.6rem] flex gap-[1.6rem]">
            <button
              ref={urlToggleRef}
              className={`${borderStyle} relative flex  items-center justify-center gap-[0.4rem] px-[1.8rem] py-[1.2rem]`}
              onClick={handleUrlClick}
            >
              {urlImg === null ? (
                <img src={github} alt="깃허브로고" />
              ) : (
                <img src={urlImg} alt="깃허브로고" />
              )}
              <img src={arrowDown} alt="토글버튼" />
              {urlToggle && (
                // 나중에 컴포넌트로 분리
                <div className="absolute left-0 right-0 top-[5rem] h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-[#FFF] py-[0.4rem] shadow-lg">
                  <div className="flex justify-center py-[0.4rem]">
                    <img
                      src={github}
                      alt="깃허브로고"
                      onClick={handleUrlImgClick}
                      className="px-3.5rem text-center"
                    />
                  </div>
                  <div className="flex justify-center  py-[0.4rem]">
                    <img src={discord} alt="디스코드로고" onClick={handleUrlImgClick} />
                  </div>
                  <div className="flex justify-center  py-[0.4rem]">
                    <img src={figma} alt="피그마로고" onClick={handleUrlImgClick} />
                  </div>
                </div>
                // 여기까지
              )}
            </button>

            <ModalInput
              id="link"
              className={`${formTextSize} ${borderStyle}`}
              placeholder="URL을 입력해 주세요."
            />
          </div>
        </ModalForm>
      </ModalLayout>
    </>
  );
}
