import { useState } from 'react';
import TeamsMember from '../../public/data/TeamsMember.json';
import profile from '../../public/profile.svg';
import MemberProfile from './Modal/MemberProfile';

function TeamMemberList() {
  const [memberProfile, setMemberProfile] = useState(false);
  const [memberId, setMemberId] = useState<number | null>(null);

  const handleProfileClick = (userId: number) => {
    setMemberProfile(!memberProfile);
    setMemberId(userId);
  };
  const { members } = TeamsMember;

  const getMemberId = () => {
    if (memberId === null) {
      return null;
    }
    return members.find((member) => member.userId === memberId);
  };

  return (
    <>
      {memberProfile && <MemberProfile wrong={handleProfileClick} getMemberId={getMemberId()} />}
      <div className="mx-[2.4rem] mt-[4.2rem]  border-[0.1rem] border-[#DCDCDC]">
        <h3 className="mb-[6.5rem] ml-12 mt-[2.3rem] text-[1.6rem]">{TeamsMember.name} 멤버</h3>
        {members.map((member) => (
          <div
            className="mb-12 ml-16 mr-[15.7rem] flex items-center justify-between text-[2rem]"
            key={member.userId}
          >
            {member.profileImg !== 'null' ? (
              <button>
                <div onClick={() => handleProfileClick(member.userId)}>해당 이미지</div>
              </button>
            ) : (
              <button>
                <img
                  src={profile}
                  alt="profile"
                  onClick={() => handleProfileClick(member.userId)}
                />
              </button>
            )}
            <p>{member.name}</p>
            <p>{member.role}</p>
            <p>{member.grade}</p>
            <button>추방</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default TeamMemberList;
