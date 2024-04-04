import { Link } from 'react-router-dom';
import LandingImg from '../../public/assets/b092b2f4d5e614fd0d65600fb2b5ce08 1.png';
import LandingNav from '@/components/landing/LandingNav';
import Section from '@/components/landing/Section';
import SectionItem from '@/components/landing/SectionItem';

export default function HomePage() {
  return (
    <div className=" w-full bg-[#000] text-white">
      <LandingNav />
      <div className="mt-[3rem] flex flex-col items-center px-[10.3rem]">
        <img src={LandingImg} alt="임시 이미지" />
        <div className="mb-[2.5rem] flex gap-[0.8rem] text-[5rem]">
          <p className="text-white">
            복잡한 일정 그리고 팀 관리를 위한 <span className="text-[#5534DA]">KEEPY_UPPY</span>
          </p>
        </div>
        <Link to={'signin'}>
          <div className=" mb-[8rem] flex w-[28rem] justify-center rounded-[0.6rem] bg-[#5534DA] py-[1.5rem] text-body3-regular">
            로그인하기
          </div>
        </Link>
        <div className="mb-[9rem]">
          <Section>
            <SectionItem check="check1" textup="팀 일정을 한 페이지로" textBottom="관리하세요" />
          </Section>
        </div>
        <div className="mb-[9rem]">
          <Section>
            <SectionItem check="check2" textup="나의 일정도 함께" textBottom="관리해 보세요" />
          </Section>
        </div>
        <Section>
          <SectionItem check="check3" textup="뭘 넣지?" textBottom="~~하세요" />
        </Section>
      </div>
    </div>
  );
}
