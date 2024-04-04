import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { InputValidateMessage } from '../common/Input';
import TextButton from '../common/TextButton';
import { AxiosError, HttpStatusCode } from 'axios';
import { useStepContext } from '@/contexts/SignupStepProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { defaultInstance, useAxios } from '@/hooks/useAxios';
import { User } from '@/types/user';
import ProfileIcon from '@/assets/ProfileIcon';

interface UserEditForm {
  [key: string]: string | FileList;
  profileImage: FileList;
  name: string;
  username: string;
  bio: string;
}

function EnterUserStepContent() {
  const { user, setUser } = useUserContext();
  const { setStep, setFormValidity } = useStepContext();

  const {
    data: unavailableUsername,
    error: checkUsernameError,
    fetchData: fetchCheckUsername,
  } = useAxios<boolean>({
    path: `user/checkUsername/${user?.username}`,
    method: 'GET',
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    watch,
    formState: { isValid, errors },
    trigger,
  } = useForm<UserEditForm>({
    mode: 'all',
    defaultValues: {
      username: user?.username || '',
    },
  });

  const handleCheckUsername = () => {
    const newUsername = getValues('username');
    fetchCheckUsername({
      newPath: `/user/check-username/${newUsername}`,
    });
  };

  const [imagePreviewURL, setImagePreviewURL] = useState('');
  const image = watch('profileImage');

  const onSubmit: SubmitHandler<UserEditForm> = async (formData) => {
    const formDataOfImage = new FormData();
    const profileImage = formData.profileImage[0];
    formDataOfImage.append('image', profileImage);

    const fetchImage = () => {
      if (!profileImage) {
        return Promise.resolve();
      }
      return defaultInstance.patch('/user/image', formDataOfImage);
    };

    const formDataOfUser = { name: formData.name, username: formData.username, bio: formData.bio };
    const fetchUserInfo = () => {
      return defaultInstance.patch<User>('/user/', formDataOfUser);
    };

    try {
      const results = await Promise.allSettled([fetchImage(), fetchUserInfo()]);
      const patchUserResponse = results[1];
      if (patchUserResponse.status === 'fulfilled') {
        patchUserResponse.value.status === HttpStatusCode.Ok &&
          setUser(patchUserResponse.value.data);
        setStep(3);
      } else if (patchUserResponse.status === 'rejected') {
        const error = patchUserResponse.reason;
        if (error instanceof AxiosError && error.response?.status === HttpStatusCode.BadRequest) {
          setError('username', { type: 'duplicated', message: '이미 사용중인 닉네임입니다.' });
        } else {
          alert('예상치 못한 에러 발생. 잠시 후 다시 시도해 주세요.');
        }
      }
    } catch (error) {
      alert('예상치 못한 에러 발생. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreviewURL(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    if (unavailableUsername === true) {
      setError('username', { type: 'duplicated', message: '이미 사용중인 닉네임입니다.' });
    } else if (unavailableUsername === false) {
      clearErrors('username');
      trigger('username');
    }
    if (checkUsernameError) {
      alert(checkUsernameError.message || '닉네임 중복확인에 실패하였습니다');
    }
  }, [unavailableUsername, checkUsernameError]);

  useEffect(() => {
    setFormValidity(isValid);
  }, [isValid, setFormValidity]);

  return (
    <div className="mb-12 mt-[3.4rem] rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 pb-[5.2rem] pt-12">
      <form
        id="enterUserForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[74rem] flex-col pl-[19.2rem] pr-[19.1rem]"
      >
        <span className="text-body3-medium text-black">프로필 이미지</span>
        <div className="mb-[1.1rem] mt-4 flex items-center justify-end gap-[5.8rem]">
          {imagePreviewURL ? (
            <img
              src={imagePreviewURL}
              alt="프로필 미리보기"
              className="h-[6.6rem] w-[6.6rem] rounded-full object-cover"
            ></img>
          ) : (
            <ProfileIcon size="lg" className="h-[6.6rem] w-[6.6rem]"></ProfileIcon>
          )}
          <label
            htmlFor="profileImage"
            className="flex h-[4.6rem] min-w-[8.7rem] items-center justify-center rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 bg-white px-[1.8rem] py-[1.2rem] text-body4-bold leading-[2.2rem] text-gray100"
          >
            프로필 변경
          </label>
          <input
            {...register('profileImage')}
            id="profileImage"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="flex w-full flex-col gap-8">
          <Input
            register={register('name', {
              maxLength: {
                value: 20,
                message: '20자 이하로 작성해주세요',
              },
              pattern: {
                value: /^[가-힣A-Za-z]+$/,
                message: '이름은 한글, 알파벳만 사용할 수 있습니다.',
              },
            })}
            id="name"
            name="name"
            label="이름"
            type="text"
            autoComplete="off"
          >
            <InputValidateMessage
              isError={errors.name?.message}
              errorMessage={errors.name?.message}
              watchMessage={`${watch('name')?.length || 0}/20`}
            />
          </Input>
          <div className="flex gap-[1.2rem]">
            <Input
              register={register('username', {
                required: true,
                minLength: {
                  value: 5,
                  message: '유저네임은 5자 이상, 30자 이하여야 합니다.',
                },
                maxLength: {
                  value: 30,
                  message: '유저네임은 5자 이상, 30자 이하여야 합니다.',
                },
                pattern: {
                  value: /^[가-힣a-zA-Z0-9_-]+$/,
                  message: '유저네임은 한글, 알파벳, 숫자, 밑줄(_),(-)만 사용할 수 있습니다.',
                },
                validate: {
                  checkAvailable: () =>
                    unavailableUsername === false || '닉네임 중복을 확인해주세요',
                },
              })}
              id="username"
              label="닉네임*"
              type="text"
              placeholder={user?.username}
            >
              <InputValidateMessage
                isError={errors.username?.message}
                errorMessage={errors.username?.message}
                isValid={unavailableUsername || false}
                validMessage="사용 가능한 닉네임입니다."
              />
            </Input>
            <TextButton
              type="button"
              buttonSize="sm"
              onClick={handleCheckUsername}
              className="self-end"
            >
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
          >
            <InputValidateMessage
              isError={errors.bio?.message}
              errorMessage={errors.bio?.message}
              watchMessage={`${watch('bio')?.length || 0}/20`}
            />
          </Input>
        </div>
      </form>
    </div>
  );
}

export default EnterUserStepContent;
