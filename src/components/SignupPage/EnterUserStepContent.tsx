import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import TextButton from '../common/TextButton';
import { useAxios } from '@/hooks/useAxios';
import { User, UserEditForm } from '@/types/user';

const user = {
  name: '이채빈',
  imageUrl: null,
  username: '이채빈유저네임',
};

function EnterUserStepContent() {
  const navigate = useNavigate();
  const { data, error } = useAxios<User>({
    method: 'PUT',
  });

  const {
    data: isAvailableUsername,
    error: checkUsernameError,
    fetchData: checkUsername,
  } = useAxios<boolean>({
    path: `user/checkUsername/${user.username}`,
    method: 'PUT',
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { isValid, errors },
  } = useForm<UserEditForm>({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
    },
  });
  const handleCheckUsername = () => {
    const newUsername = getValues('username');
    const encodedUsername = encodeURIComponent(newUsername);
    checkUsername({
      newPath: `user/checkUsername/${encodedUsername}`,
    });
  };
  const onValid = (data) => {
    console.log(data);
  };

  const onInvalid = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (isAvailableUsername === false) {
      setError('username', { type: 'manual', message: '이미 사용중인 닉네임입니다.' });
      console.log(errors.username?.message);
    } else if (isAvailableUsername === true) {
      clearErrors('username');
      console.log(errors.username?.message);
    }
    if (checkUsernameError) {
      console.log(checkUsernameError);
    }
  }, [isAvailableUsername, checkUsernameError]);

  return (
    <div className="mb-12 mt-[3.4rem] rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 py-12">
      <form
        id="editUser"
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex w-[74rem] flex-col pl-[19.2rem] pr-[19.1rem]"
      >
        <span className="text-[1.4rem] font-medium leading-[2.2rem] text-black">프로필 이미지</span>
        <div className="mb-[1.1rem] mt-4 flex items-center justify-end gap-[5.8rem]">
          <img src="/public/assets/profile-large.svg" className="" width={66} height={66}></img>
          <label htmlFor="profileImg">
            <TextButton type="button" buttonSize="sm" color="white">
              프로필 변경
            </TextButton>
          </label>
          <input
            {...register('imageUrl')}
            id="profileImg"
            type="file"
            className=""
            accept="image/*"
          />
        </div>
        <div className="flex w-full flex-col gap-8">
          <Input
            id="name"
            name="name"
            label="성함"
            type="text"
            value={user.name}
            disabled={true}
          ></Input>
          <div className="flex gap-[1.2rem]">
            <Input
              register={register('username', {
                required: true,
              })}
              id="username"
              label="닉네임*"
              type="text"
              placeholder={user.username}
            ></Input>
            <TextButton buttonSize="sm" onClick={handleCheckUsername} className="self-end">
              중복확인
            </TextButton>
          </div>
          <Input
            register={register('bio', {
              maxLength: {
                value: 20,
                message: '20자 이하로 작성해주세요',
              },
            })}
            id="bio"
            label="소개"
            type="text"
            placeholder="간단한 자기소개를 입력해주세요."
          ></Input>
        </div>
      </form>
    </div>
  );
}

export default EnterUserStepContent;
