import { MEMBER } from '@/constants/Team';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import TextButton from '../common/TextButton';
import ModalLayout from '../common/modal/ModalLayout';
import AlertModal from './AlertModal';
import { AxiosError, HttpStatusCode } from 'axios';
import { useModal } from '@/contexts/ModalProvider';
import { defaultInstance } from '@/hooks/useAxios';
import { Grade, Role } from '@/types/teamTypes';

interface ManageTeamHistoryModalProps {
  id: number;
  teamname: string;
  grade: Grade;
  role: Role;
  onClose: () => void;
  children?: ReactNode;
}

interface TeamHistoryEditForm {
  teamname: string;
  grade: string;
  role: string;
}

export default function ManageTeamHistoryModal({
  id,
  teamname,
  role,
  grade,
  onClose,
}: ManageTeamHistoryModalProps) {
  const openModal = useModal();
  const manageableGrade = !(grade === 'TEAM_MEMBER');

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, isDirty },
    control,
  } = useForm<TeamHistoryEditForm>({
    mode: 'all',
    defaultValues: {
      teamname: teamname,
      grade: MEMBER.GRADE[grade],
      role: MEMBER.ROLE[role],
    },
  });

  const onLeaveClick = () => {
    onClose();
  };
  const onSubmit: SubmitHandler<TeamHistoryEditForm> = async (formData) => {
    if (!isDirty) {
      onClose();
      return;
    }
    const name = formData.teamname;
    const grade = Object.keys(MEMBER.ROLE).find(
      (key) => MEMBER.GRADE[key as keyof typeof MEMBER.GRADE] === formData.grade,
    );
    const role = Object.keys(MEMBER.ROLE).find(
      (key) => MEMBER.ROLE[key as keyof typeof MEMBER.ROLE] === formData.role,
    );
    console.log(name, grade, role);

    //로직 추가
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
              readOnly={!manageableGrade}
              className={manageableGrade ? '' : 'bg-gray10'}
            >
              <div className="flex justify-between">
                {errors.teamname?.message ? (
                  <span className="text-body5-regular leading-[2.2rem] text-point_red">
                    {errors.teamname.message}
                  </span>
                ) : (
                  <span></span>
                )}
                <span className="self-end text-body5-regular leading-[2.2rem] text-gray50">
                  {`${watch('teamname')?.length || 0}/20`}
                </span>
              </div>
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
              <TextButton color="red" buttonSize="md" onClick={onLeaveClick}>
                팀 나가기
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
