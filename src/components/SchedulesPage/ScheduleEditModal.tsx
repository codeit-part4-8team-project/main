import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalScheduleCalendarInput from '@/components/common/modal/ModalScheduleCalendarInput';
import { Schedule } from '@/contexts/CalenarProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';

interface ScheduleEditModalProps {
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
  onStartTimeClick?: (time: string) => void;
  onEndTimeClick?: (time: string) => void;
  closeClick?: () => void;
  user?: boolean;
  team?: boolean;
  teamId?: string;
  selectedSchedule: Schedule;
  onClick?: () => void;
}
type Inputs = {
  title: string;
  startDateTime: string;
  endDateTime: string;
  content: string;
};
interface defaultValue {
  content: string;
  title: string;
}
function ScheduleEditModal({
  closeClick,
  team = false,
  user = false,
  selectedSchedule,
  onClick,
  onModalStartDateClick,
  onModalEndDateClick,
}: ScheduleEditModalProps) {
  const { data: defaultValue } = useAxios<defaultValue>(
    {
      path: `schedule/${selectedSchedule.id}`,
    },
    true,
  );
  const { content: defaultContent, title: defaultTitle }: defaultValue = defaultValue || {
    content: selectedSchedule.content,
    title: selectedSchedule.title,
  };
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      content: defaultContent,
      title: defaultTitle,
    },
  });
  const titleWatch = watch('title');
  console.log(watch('title'));
  const contentWatch = watch('content');

  const { fetchData: userFetchData } = useAxios({});
  const { fetchData: teamFetchData } = useAxios({});
  const { user: userInformation } = useUserContext();
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    selectedSchedule.startDateTime,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(selectedSchedule.endDateTime);

  useEffect(() => {
    if (selectedSchedule) {
      setSelectedStartDate(selectedSchedule.startDateTime);
      setSelectedEndDate(selectedSchedule.endDateTime);
    }
  }, [selectedSchedule]);
  const onSubmit: SubmitHandler<Inputs> = async ({ title, content }) => {
    const createSchedlue = {
      title: title,
      startDateTime: selectedStartDate,
      endDateTime: selectedEndDate,
      content: content,
    };

    handleScheduleUserFetch(createSchedlue);
  };

  const handleStartDateClick = (date: string) => {
    setSelectedStartDate(date);
    if (onModalStartDateClick) {
      onModalStartDateClick(date);
    }
  };

  const handleEndDateClick = (date: string) => {
    setSelectedEndDate(date);
    if (onModalEndDateClick) {
      onModalEndDateClick(date);
    }
  };

  const handleStartTimeClick = (Time: string) => {
    setSelectedStartDate(selectedStartDate + ' ' + Time);
  };

  const handleEndTimeClick = (time: string) => {
    setSelectedEndDate(selectedEndDate + ' ' + time);
  };
  const handleStartDateChange = (date: string) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setSelectedEndDate(date);
  };
  const handleScheduleUserFetch = (data: Inputs) => {
    if (user) {
      userFetchData({
        newPath: `schedule/${selectedSchedule.id}`,
        newMethod: 'PATCH',
        newData: data,
      });
    } else if (team) {
      teamFetchData({
        newPath: `schedule/${selectedSchedule.id}`,
        newMethod: 'PATCH',
        newData: data,
      });
    }
    closeClick?.();
    window.location.reload();
  };

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const InputValueLength = 'mb-[0.9rem] flex justify-end text-gray50';

  return (
    <>
      <ModalLayout title="일정" closeClick={closeClick} onClick={onClick}>
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
                defaultValue={defaultTitle}
                hookform={register('title', { required: true, maxLength: 20 })}
                className={`${inputTextSize} ${borderStyle}`}
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
              <p className={`${InputValueLength}`}>{titleWatch.length}/20</p>
            ) : (
              <p className={`${InputValueLength}`}>0/20</p>
            )}
            <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
              <ModalLabel label="내용" className={`${formTextSize}`} htmlFor="content" />
              <ModalInput
                defaultValue={defaultContent}
                hookform={register('content', { required: true, maxLength: 40 })}
                className={`${inputTextSize} ${borderStyle}`}
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
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              endValue={selectedEndDate}
            />
          </ModalFormBorder>
          <TextButton
            buttonSize="md"
            className="mt-16 text-body4-bold text-point_red"
            color="black"
            type="submit"
          >
            수정완료
          </TextButton>
        </form>
      </ModalLayout>
    </>
  );
}

export default ScheduleEditModal;
