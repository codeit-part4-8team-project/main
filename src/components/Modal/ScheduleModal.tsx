import { SubmitHandler, useForm } from 'react-hook-form';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalScheduleCalendarInput from '@/components/common/modal/ModalScheduleCalendarInput';
import { useAxios } from '@/hooks/useAxios';

interface ScheduleModalProps {
  closeClick?: () => void;
  user?: boolean;
  team?: boolean;
}
// 논의 결과 type은 제외해서 api 쏘기로 결정
type Inputs = {
  title: string;
  type?: 'TEAM' | 'USER' | string; // 나중에 프롭으로 TEAM,USER 받기.
  startDateTime: string;
  endDateTime: string;
  content: string;
};
// 여기는 user인지 team인지 구분이 필요함
function ScheduleModal({ closeClick, user = false, team = false }: ScheduleModalProps) {
  const { fetchData } = useAxios({});
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const InputValueLength = 'mb-[0.9rem] flex justify-end text-gray50';

  // - 필드 이름이 date면 날짜만, dateTime이면 시간 포함
  // - Swagger에 있는 날짜 포맷말고  yyyy-MM-dd HH:mm:ss 사용
  // {
  //   "type": "string", // 얘 없음 -> TEAM인지 USER인지 구분 defaule value로 처리
  // 나중에 물어보기 위에 type;
  //   "title": "string",
  //   "content": "string", // 얘 없음
  //   "startDateTime": "yyyy-MM-dd HH:mm:ss",
  //   "endDateTime": "yyyy-MM-dd HH:mm:ss"
  // }

  // type = USER 인 경우의 리스폰스 값
  //   content: "내용"
  // endDateTime: "2024-03-22 00:00:00"
  // id: 3
  // startDateTime: "2024-03-12 00:00:00"
  // title: "제목"
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const type = 'USER';
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createSchedlue = {
      title: data.title,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      content: data.content,
      type: type, // 얘는 협의 후 빼기로 결정 추후 패치되면 삭제 하기
    };
    handleScheduleFetch(createSchedlue);
    console.log('createTema', createSchedlue);
  };

  const handleScheduleFetch = (data: Inputs) => {
    if (user) {
      fetchData({
        newPath: 'schedule/user',
        newMethod: 'POST',
        newData: data,
      });
    } else if (team) {
      fetchData({
        newPath: `schedule/team/${teamId}`,
        newMethod: 'POST',
        newData: data,
      });
    }
  };

  return (
    <ModalLayout title="일정 추가" closeClick={closeClick} size="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자(나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
            {/*  */}
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="제목" className={`${formTextSize}`} htmlFor="title" />
            <ModalInput
              hookform={register('title')}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="일정 제목을 입력해 주세요."
              id="title"
              type="text"
              name="title"
            />
          </div>
          {watch('title') ? (
            <p className={`${InputValueLength}`}>{watch('title')?.length}/20</p>
          ) : (
            <p className={`${InputValueLength}`}>0/20</p>
          )}
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="내용" className={`${formTextSize}`} htmlFor="content" />
            <ModalInput
              hookform={register('content')}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="내용을 입력해 주세요."
              id="content"
              type="text"
              name="content"
            />
            {watch('content') ? (
              <p className={`${InputValueLength}`}>{watch('content')?.length}/40</p>
            ) : (
              <p className={`${InputValueLength}`}>0/40</p>
            )}
          </div>
          <ModalScheduleCalendarInput
            startHookform={register('startDateTime')}
            startName="startDateTime"
            endHookform={register('endDateTime')}
            endName="endDateTime"
          />
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          일정 추가하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}

export default ScheduleModal;
