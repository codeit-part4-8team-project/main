import { Link } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserProvider';

export default function NotFound() {
  const { user } = useUserContext();
  return (
    <body className="h-screen bg-gray20">
      <div className="p-[10rem]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-[10rem] text-[30rem] font-bold">404</h1>
          <span className=" pb-[15rem] text-[10rem] font-medium  text-point_red">
            PAGE NOT FOUND
          </span>
          <div className="text mb-20 flex items-center gap-14 font-rammetto text-[4rem] underline">
            <Link to={`/user/${user?.id}/main` || `/`}>go to Keepy Uppy.</Link>
          </div>
        </div>
      </div>
    </body>
  );
}
