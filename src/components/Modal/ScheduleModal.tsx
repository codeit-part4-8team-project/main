import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalScheduleCalendarInput from '@/components/common/modal/ModalScheduleCalendarInput';
import { Schedule } from '@/contexts/CalenarProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { Trigger, useAxios } from '@/hooks/useAxios';

interface ScheduleModalProps {
  teamFetchData?: Trigger;
  userFetchData?: Trigger;
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
  onStartTimeClick?: (time: string) => void;
  onEndTimeClick?: (time: string) => void;
  closeClick?: () => void;
  user?: boolean;
  team?: boolean;
  teamId?: string;
  scheduleData: Schedule[];
  onAddSchedule?: (newSchedule: Schedule) => void;
}
type Inputs = {
  id: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  content: string;
  name: string;
};
// 여기는 user인지 team인지 구분이 필요함
// 합칠때 teamId 에러가 계속 떠서 일단 기본값 넣어줌
function ScheduleModal({
  userFetchData,
  teamFetchData,
  closeClick,
  team = false,
  user = false,
  teamId,
  onModalStartDateClick,

  onAddSchedule,
  onModalEndDateClick,
}: ScheduleModalProps) {
  // const { data: userData, fetchData: userFetchData } = useAxios({});
  // const { data: teamData, fetchData: teamFetchData } = useAxios({});
  const { user: userInformation } = useUserContext();
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  // console.log(userData);
  // console.log(teamData);
  const { register, handleSubmit, watch } = useForm<Inputs>();
  //const { setSchedules, setFilteredSchedules, mode, nowDate } = useContext(calendarContext);
  const onSubmit: SubmitHandler<Inputs> = async ({ title, content, id, name }, event) => {
    const createSchedlue = {
      id: id,
      title: title,
      startDateTime: selectedStartDate,
      endDateTime: selectedEndDate,
      content: content,
      name: name,
    };

    try {
      // console.log('스캐줄', createSchedlue);
      await handleScheduleUserFetch(createSchedlue);
      //event?.target.closest('dialog').close();

      //window.location.reload();
      onAddSchedule?.(createSchedlue);
      closeClick?.();
    } catch (error) {
      console.error('Failed to add schedule:', error);
    }

    event?.target.closest('dialog').close();
  };
  const titleWatch = watch('title');
  const contentWatch = watch('content');

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const InputValueLength = 'mb-[0.9rem] flex justify-end text-gray50';

  const handleScheduleUserFetch = (data: Inputs) => {
    if (user && userFetchData) {
      userFetchData({
        newPath: 'schedule/user',
        newMethod: 'POST',
        newData: data,
      });
    } else if (team && teamFetchData) {
      teamFetchData({
        newPath: `schedule/team/${teamId}`,
        newMethod: 'POST',
        newData: data,
      });
    }
  };
  const handleStartDateClick = (date: string) => {
    setSelectedStartDate(date); // 변수와 문자열을 올바르게 결합
    if (onModalStartDateClick) {
      onModalStartDateClick(date);
    }
  };
  const handleEndDateClick = (date: string) => {
    setSelectedEndDate(date);
    if (onModalEndDateClick) {
      onModalEndDateClick(date);
    } else if (new Date(date) < new Date(selectedStartDate)) {
      alert('종료날짜는 시작 날짜보다 이후여햐 합니다. ');
    }
  };
  const handleStartTimeClick = (Time: string) => {
    setSelectedStartDate(selectedStartDate + ' ' + Time);
  };
  const handleEndTimeClick = (Time: string) => {
    setSelectedEndDate(selectedEndDate + ' ' + Time);
  };
  return (
    <ModalLayout title="일정 추가" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자(나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img
              src={userInformation?.imageUrl}
              alt="profile"
              className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
            />
            <p className=" text-[1.4rem]">{userInformation?.name}</p>
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="제목" className={`${formTextSize}`} htmlFor="title" />
            <ModalInput
              hookform={register('title', { required: true, maxLength: 20 })}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="일정 제목을 입력해 주세요."
              id="title"
              type="text"
              name="title"
            />
          </div>
          {titleWatch?.length > 20 && (
            <div className="absolute text-point_red">
              <p>20자 이하로 입력해 주세요.</p>
            </div>
          )}

          {titleWatch ? (
            <p className={`${InputValueLength}`}>{titleWatch?.length}/20</p>
          ) : (
            <p className={`${InputValueLength}`}>0/20</p>
          )}
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="내용" className={`${formTextSize}`} htmlFor="content" />
            <ModalInput
              hookform={register('content', { required: true, maxLength: 40 })}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="내용을 입력해 주세요."
              id="content"
              type="text"
              name="content"
            />
          </div>
          {contentWatch?.length > 40 && (
            <div className="absolute text-point_red">
              <p>40자 이하로 입력해 주세요.</p>
            </div>
          )}
          {contentWatch ? (
            <p className={`${InputValueLength}`}>{contentWatch?.length}/40</p>
          ) : (
            <p className={`${InputValueLength}`}>0/40</p>
          )}

          <ModalScheduleCalendarInput
            startHookform={register('startDateTime')}
            startName="startDateTime"
            endHookform={register('endDateTime')}
            endName="endDateTime"
            onModalStartDateClick={handleStartDateClick}
            onModalEndDateClick={handleEndDateClick}
            onStartClickTime={handleStartTimeClick}
            onEndClickTime={handleEndTimeClick}
            startValue={selectedStartDate}
            endValue={selectedEndDate}
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
