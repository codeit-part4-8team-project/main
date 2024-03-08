import Nav from '@/components/common/Nav';
import MemberProfile from '@/components/Modal/MemberProfile';
import TeamMemberList from '@/components/TeamMemberList';

// const HomePage = () => {
//   return (
//     <>
//       <Nav />
//       <div>홈페이지입니다.</div>
//     </>
//   );
// };

const HomePage = () => {
  return (
    <>
      <Nav />
      <TeamMemberList />
      {/* <MemberProfile /> */}
    </>
  );
};
export default HomePage;
