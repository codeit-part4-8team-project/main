import TeamsMember from '../../public/data/TeamsMember.json';
import profile from '../../public/profile.svg';

console.log(TeamsMember);

function TeamMemberList() {
  const { members } = TeamsMember;
  console.log(members);
  return (
    <div className="mx-[2.4rem] mt-[4.2rem]  border-[0.1rem] border-[#DCDCDC]">
      <h3 className="mb-[6.5rem] ml-12 mt-[2.3rem] text-[1.6rem]">{TeamsMember.name} 멤버</h3>
      {members.map((member, index) => (
        <div
          className="mb-12 ml-16 mr-[15.7rem] flex items-center justify-between text-[2rem]"
          key={index}
        >
          {member.profileImg !== 'null' ? (
            <div>해당 이미지</div>
          ) : (
            <img src={profile} alt="profile" />
          )}
          <p>{member.name}</p>
          <p>{member.role}</p>
          <p>{member.grade}</p>
          <button>추방</button>
        </div>
      ))}
    </div>
  );
}

export default TeamMemberList;
