import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { InputValidateMessage } from '../common/Input';
import TextButton from '../common/TextButton';
import ModalLayout from '../common/modal/ModalLayout';
import { AxiosError, HttpStatusCode } from 'axios';
import { usePagenation } from '@/contexts/PageProvider';
import { UserContextValue } from '@/contexts/UserProvider';
import { defaultInstance, useAxios } from '@/hooks/useAxios';
import ProfileIcon from '@/assets/ProfileIcon';

interface EditProfileModalProps {
  children?: ReactNode;
  handleClose: () => void;
  userContext: UserContextValue;
}

interface UserEditForm {
  [key: string]: string | FileList;
  profileImage: FileList;
  name: string;
  username: string;
  bio: string;
}

export default function EditProfileModal({ handleClose, userContext }: EditProfileModalProps) {
  const { refetch } = usePagenation();
  const { user, setUser } = userContext;
  const [isUniqueUsername, setIsUniqueUsername] = useState<boolean>(true);

  const {
    data: unavailableUsername,
    error: checkUsernameError,
    loading,
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
    formState: { isValid, errors, dirtyFields },
    trigger,
  } = useForm<UserEditForm>({
    mode: 'all',
    defaultValues: {
      name: user?.name,
      username: user?.username,
    },
  });

  const handleCheckUsername = () => {
    const newUsername = getValues('username');
    fetchCheckUsername({
      newPath: `/user/check-username/${newUsername}`,
    });
  };

  const [imagePreviewURL, setImagePreviewURL] = useState(user?.imageUrl || '');
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
      return defaultInstance.patch('/user/', formDataOfUser);
    };

    try {
      const results = await Promise.allSettled([fetchImage(), fetchUserInfo()]);
      const fetchUserResponse = results[1];

      if (fetchUserResponse.status === 'fulfilled') {
        setUser(fetchUserResponse.value.data);
        refetch && refetch(); //유저네임 바뀌는 것 때문에 팀 히스토리 쪽 모달에 문제생겨서 유
        handleClose();
      } else if (fetchUserResponse.status === 'rejected') {
        const error = fetchUserResponse.reason;
        if (error instanceof AxiosError) {
          if (error.response?.status === HttpStatusCode.BadRequest) {
            setError('username', { type: 'duplicated', message: '이미 사용중인 닉네임입니다.' });
          } else {
            alert((error as AxiosError<string>).response?.data || '닉네임 변경에 실패하였습니다');
          }
        }
      }
    } catch (error) {
      console.error('프로필 변경 실패:', error);
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
      setIsUniqueUsername(() => false);
      trigger('username', { shouldFocus: true });
    } else if (unavailableUsername === false) {
      clearErrors('username');
      setIsUniqueUsername(() => true);
      trigger('username', { shouldFocus: true });
    }
    trigger();
    if (checkUsernameError) {
      alert(checkUsernameError.message || '닉네임 중복확인에 실패하였습니다');
    }
  }, [unavailableUsername, checkUsernameError, loading]);

  return (
    <ModalLayout title="프로필 변경" closeClick={handleClose}>
      <div className="mb-16 mt-[3.9rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 pb-[5.2rem] pt-12">
        <form
          id="editUserForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col px-12"
        >
          <span className="text-body3-medium text-black">프로필 이미지</span>
          <div className="relative mb-[1.1rem] mt-4 flex items-center justify-center">
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
              className="absolute right-0 flex h-[4.6rem] w-[8.7rem] items-center justify-center rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 bg-white py-[1.2rem] text-body4-bold leading-[2.2rem] text-gray100"
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
                required: '이름을 입력해주세요',
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
                watchMessage={`${watch('teamname')?.length || 0}/20`}
              />
            </Input>
            <div className="flex gap-[1.2rem]">
              <Input
                register={register('username', {
                  required: '유저네임을 입력해주세요',
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
                      !dirtyFields.username || isUniqueUsername || '닉네임 중복을 확인해주세요',
                  },
                  onChange: () => {
                    setIsUniqueUsername(false);
                  },
                })}
                id="username"
                label="유저네임"
                type="text"
                placeholder={user?.username}
                autoComplete="off"
              >
                <InputValidateMessage
                  isError={dirtyFields.username && errors.username?.message}
                  errorMessage={errors.username?.message}
                  isValid={isUniqueUsername || !dirtyFields.username}
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
              autoComplete="off"
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
      <TextButton buttonSize="md" form="editUserForm" disabled={!isValid} className="mb-[0.8rem]">
        변경하기
      </TextButton>
    </ModalLayout>
  );
}
