import { MouseEventHandler } from 'react';

interface ModalUrlToggleProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  github: string;
  discord: string;
  figma: string;
}

export default function ModalUrlToggle({ onClick, github, discord, figma }: ModalUrlToggleProps) {
  return (
    <div className="absolute left-0 right-0 top-[5rem] z-50 h-[7.4rem] w-[7.5rem] rounded-[0.6rem] bg-white py-[0.4rem] shadow-lg">
      <div
        className="flex justify-center py-[0.4rem] hover:bg-gray10"
        onClick={onClick}
        data-set={github}
        data-id="githubLink"
      >
        <img src={github} alt="깃허브로고" className="px-3.5rem text-center" />
      </div>
      <div
        className="flex justify-center  py-[0.4rem] hover:bg-gray10"
        onClick={onClick}
        data-set={discord}
        data-id="discordLink"
      >
        <img src={discord} alt="디스코드로고" />
      </div>
      <div
        className="flex justify-center  py-[0.4rem] hover:bg-gray10"
        onClick={onClick}
        data-set={figma}
        data-id="figmaLink"
      >
        <img src={figma} alt="피그마로고" />
      </div>
    </div>
  );
}
