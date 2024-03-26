import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxInput from './CheckboxInput';
import { useStepContext } from '@/contexts/SignupStepProvider';

function ToSStepContent() {
  const { setStep, setFormValidity } = useStepContext();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const agreeAll = watch('agreeAll');

  const onSubmit = () => {
    setStep(2);
  };

  useEffect(() => {
    setValue('service', agreeAll);
    setValue('privacy', agreeAll);
  }, [agreeAll, setValue]);

  useEffect(() => {
    setFormValidity(isValid);
  }, [isValid, setFormValidity]);

  return (
    <form id="ToSForm" onSubmit={handleSubmit(onSubmit)} className="flex w-[74rem] flex-col">
      <div className="mb-[1.6rem] h-[33.2rem] w-full shrink-0 rounded-[0.6rem] bg-gray10 py-12 pl-[3.4rem] pr-[2.6rem]">
        <div className="flex items-center gap-[1.6rem]">
          <CheckboxInput
            id="service"
            control={control}
            register={register('service', {
              required: true,
            })}
          ></CheckboxInput>
          <span className="flex items-center gap-4 text-[1.4rem] font-bold leading-[2.2rem] text-gray100">
            <span className="text-[1.2rem] font-normal leading-8">(필수)</span>서비스 이용약관 동의
          </span>
        </div>
        <p className="mb-8 mt-8 h-[8.6rem] w-full overflow-auto bg-white p-[1.6rem]">
          추억과 이런 내린 헤일 피어나듯이 이국 위에 같이 나는 까닭입니다.가슴속에 이제 경,
          까닭입니다. 위에도 토끼, 이웃 그리고 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써
          토끼, 멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루,
          파란 나의 덮어 까닭입니다. 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써 토끼, 멀리
          노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루, 파란 나의 덮어
          까닭입니다. 추억과 이런 내린 헤일 피어나듯이 이국 위에 같이 나는 까닭입니다.가슴속에 이제
          경, 까닭입니다. 위에도 토끼, 이웃 그리고 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을
          벌써 토끼, 멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리
          노루, 파란 나의 덮어 까닭입니다. 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써 토끼,
          멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루, 파란 나의
          덮어 까닭입니다.
        </p>
        <div className="flex items-center gap-[1.6rem]">
          <CheckboxInput
            id="privacy"
            control={control}
            register={register('privacy', {
              required: true,
            })}
          ></CheckboxInput>
          <span className="flex items-center gap-4 text-[1.4rem] font-bold leading-[2.2rem] text-gray100">
            <span className="text-[1.2rem] font-normal leading-8">(필수)</span>개인정보 수집 및
            이용동의
          </span>
        </div>
        <p className="mt-8 h-[8.6rem] w-full overflow-auto bg-white p-[1.6rem] ">
          추억과 이런 내린 헤일 피어나듯이 이국 위에 같이 나는 까닭입니다.가슴속에 이제 경,
          까닭입니다. 위에도 토끼, 이웃 그리고 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써
          토끼, 멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루,
          파란 나의 덮어 까닭입니다. 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써 토끼, 멀리
          노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루, 파란 나의 덮어
          까닭입니다. 추억과 이런 내린 헤일 피어나듯이 이국 위에 같이 나는 까닭입니다.가슴속에 이제
          경, 까닭입니다. 위에도 토끼, 이웃 그리고 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을
          벌써 토끼, 멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리
          노루, 파란 나의 덮어 까닭입니다. 동경과 걱정도 거외다. 내 나는 헤는 것은 이름을 벌써 토끼,
          멀리 노루, 파란 나의 덮어 까닭입니다.나는 헤는 것은 이름을 벌써 토끼, 멀리 노루, 파란 나의
          덮어 까닭입니다.
        </p>
      </div>
      <div className="ml-16 flex items-center gap-[1.6rem]">
        <CheckboxInput
          id="marketing"
          register={register('marketing')}
          control={control}
        ></CheckboxInput>
        <span className="flex items-center gap-4 text-[1.4rem] font-bold leading-[2.2rem] text-gray100">
          <span className="text-[1.2rem] font-normal leading-8">(선택)</span>광고성 정보 수신 동의
        </span>
      </div>
      <div className="mb-[2.4rem] mt-[2.2rem] h-full border-t-[0.1rem] border-solid border-t-gray30"></div>
      <div className="ml-16 flex items-center gap-[1.6rem]">
        <CheckboxInput
          id="agreeAll"
          control={control}
          register={register('agreeAll', {
            required: true,
          })}
        ></CheckboxInput>
        <span className="flex items-center gap-4 text-[1.4rem] font-bold leading-[2.2rem] text-gray100">
          KEEPY-UPPY의 이용약관 및 개인정보 처리방침을 확인하였고, 이에 모두 동의합니다.
        </span>
      </div>
    </form>
  );
}

export default ToSStepContent;
