import { MEMBER } from '@/constants/Team';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Dropdown from '../common/Dropdown';
import Input, { InputValidateMessage } from '../common/Input';
import TextButton from '../common/TextButton';
import ModalLayout from '../common/modal/ModalLayout';
import { HttpStatusCode } from 'axios';
import { usePagenation } from '@/contexts/PageProvider';
import { defaultInstance } from '@/hooks/useAxios';
import { Member, Team } from '@/types/teamTypes';

interface ManageTeamHistoryModalProps {
  me: Member;
  team: Team;
  onClose: () => void;
}

interface TeamHistoryEditForm {
  teamname: string;
  grade: string;
  role: string;
}

export default function ManageTeamHistoryModal({ me, team, onClose }: ManageTeamHistoryModalProps) {
  const { refetch } = usePagenation();
  const { id: myId, username, grade, role } = me;
  const hasEditableTeamGradeUser = !(grade === 'TEAM_MEMBER');
  const hasDeleteableTeamGradeUser = grade === 'OWNER';

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, isDirty, dirtyFields },
    control,
  } = useForm<TeamHistoryEditForm>({
    mode: 'all',
    defaultValues: {
      teamname: team.name,
      grade: MEMBER.GRADE[grade],
      role: role ? MEMBER.ROLE[role] : undefined,
    },
  });

  const onLeaveTeamClick = async () => {
    if (confirm(`정말 ${team.name} 그룹을 나가시겠습니까?`)) {
      try {
        const res = await defaultInstance.delete(`/member/${team.id}`, { data: { username } });
        if (res.status !== HttpStatusCode.Ok) {
          alert('그룹 나가기에 실패하였습니다. 잠시 후 다시 시도해주세요');
        }
      } catch {
        alert('그룹 나가기에 실패하였습니다. 잠시 후 다시 시도해주세요');
      } finally {
        onClose();
      }
    }
  };

  const onDeleteTeamClick = async () => {
    if (confirm(`정말 ${team.name} 그룹을 삭제하시겠습니까?`)) {
      try {
        const res = await defaultInstance.delete(`/team/${team.id}`);
        if (res.status !== HttpStatusCode.Ok) {
          alert('그룹 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요');
        }
      } catch {
        alert('그룹 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요');
      } finally {
        onClose();
      }
    }
  };

  const onSubmit: SubmitHandler<TeamHistoryEditForm> = async (formData) => {
    if (!isDirty) {
      onClose();
      return;
    }
    const name = formData.teamname;
    const fetchTeamname = () => {
      if (!dirtyFields.teamname) {
        return Promise.resolve();
      }
      return defaultInstance.patch(`/team/${team.id}`, { ...team, name });
    };

    // const grade = Object.keys(MEMBER.GRADE).find(
    //   (key) => MEMBER.GRADE[key as keyof typeof MEMBER.GRADE] === formData.grade,
    // );
    const role = Object.keys(MEMBER.ROLE).find(
      (key) => MEMBER.ROLE[key as keyof typeof MEMBER.ROLE] === formData.role,
    );
    const fetchMyRoleAndGrade = () => {
      return defaultInstance.patch(`/member/${myId}`, { role });
    };

    try {
      const results = await Promise.allSettled([fetchTeamname(), fetchMyRoleAndGrade()]);

      if (results[0].status !== 'fulfilled') {
        alert('그룹 이름 변경에 실패하였습니다.');
      }
      if (results[1].status !== 'fulfilled') {
        alert('유저 정보 변경에 실패하였습니다.');
      }
    } catch (error) {
      alert('그룹 정보 변경에 실패하였습니다.');
    } finally {
      refetch && refetch();
      onClose();
    }
  };

  return (
    <ModalLayout title="그룹 관리" closeClick={onClose}>
      <div className="my-16 w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 py-12">
        <form
          id="manageTeamForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col px-12"
        >
          <div className="flex w-full flex-col gap-12">
            <Input
              register={register('teamname', {
                required: '그룹 이름을 입력해주세요',
                maxLength: {
                  value: 20,
                  message: '20자 이하로 작성해주세요',
                },
                pattern: {
                  value: /^[가-힣A-Za-z]+$/,
                  message: '그룹 이름은 한글, 알파벳만 사용할 수 있습니다.',
                },
              })}
              id="teamname"
              name="teamname"
              label="그룹이름"
              type="text"
              autoComplete="off"
              readOnly={!hasEditableTeamGradeUser}
              className={hasEditableTeamGradeUser ? '' : 'bg-gray10'}
            >
              <InputValidateMessage
                isError={errors.teamname?.message}
                errorMessage={errors.teamname?.message}
                watchMessage={`${watch('teamname')?.length || 0}/20`}
              />
            </Input>
            <Input
              register={register('grade')}
              id="grade"
              label="나의 등급"
              type="text"
              readOnly={true}
              className="bg-gray10"
            ></Input>
            <div className="flex w-full flex-col items-start gap-[0.8rem]">
              <div className="text-body3-medium text-[#000000]">나의 역할</div>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={Object.values(MEMBER.ROLE)}
                    selectedOption={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                    }}
                    className="h-[4.6rem]"
                  />
                )}
              />
            </div>
            <div>
              <TextButton
                type="button"
                color="red"
                buttonSize="md"
                onClick={hasDeleteableTeamGradeUser ? onDeleteTeamClick : onLeaveTeamClick}
              >
                {hasDeleteableTeamGradeUser ? '그룹 삭제하기' : '그룹 나가기'}
              </TextButton>
              <span className="text-body5-regular leading-[2.2rem] text-point_red">
                *한번 팀을 나가면 그동안 쓴 글의 수정권한을 잃게 됩니다.
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-[0.8rem] flex gap-[1.7rem]">
        <TextButton buttonSize="md" color="white" onClick={onClose}>
          취소
        </TextButton>
        <TextButton buttonSize="md" form="manageTeamForm" disabled={!isValid}>
          확인
        </TextButton>
      </div>
    </ModalLayout>
  );
}
