import { Outlet } from 'react-router-dom';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';

function EntrancePageHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-[5.8rem] items-center justify-center gap-[0.8rem] bg-gray10">
      <KeepyUppyIcon fill="#292929" />
      <KeepyUppyLogo size="sm" />
    </div>
  );
}

function EntrancePageFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex h-[5.8rem] w-full items-center justify-center bg-gray10">
      <span className="text-body4-bold text-gray50">
        All Rights Reserved ⓒ 2024 Project Team8-Codeit KEEPY UPPY.
      </span>
    </footer>
  );
}

export default function EntrancePageLayout() {
  return (
    <>
      <EntrancePageHeader />
      <div className="flex h-screen w-screen justify-center bg-gray20 px-48 pb-[21.4rem] pt-[18.9rem] has-[.signup]:bg-gray100">
        <Outlet />
      </div>
      <EntrancePageFooter />
    </>
  );
}
