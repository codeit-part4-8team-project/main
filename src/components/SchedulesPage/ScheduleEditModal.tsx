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

function ScheduleEditModal({
  closeClick,
  team = false,
  user = false,
  selectedSchedule,
  onClick,
  onModalStartDateClick,
  onModalEndDateClick,
}: ScheduleEditModalProps) {
  const [formData, setFormData] = useState<Inputs>({
    title: selectedSchedule.title,
    startDateTime: selectedSchedule.startDateTime,
    endDateTime: selectedSchedule.endDateTime,
    content: selectedSchedule.content,
  });
  const { fetchData: userFetchData } = useAxios({});
  const { fetchData: teamFetchData } = useAxios({});
  const { user: userInformation } = useUserContext();
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    selectedSchedule.startDateTime,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(selectedSchedule.endDateTime);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [startTimeData, setStartTimeData] = useState<string>('');
  const [endTimeData, setEndTimeData] = useState<string>('');

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const titleWatch = watch('title');
  const contentWatch = watch('content');

  useEffect(() => {
    if (selectedSchedule) {
      setSelectedStartDate(selectedSchedule.startDateTime);
      setSelectedEndDate(selectedSchedule.endDateTime);
    }
  }, [selectedSchedule]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      startDateTime: selectedStartDate + ' ' + selectedStartTime,
      endDateTime: selectedEndDate + ' ' + selectedEndTime,
    }));
  }, [
    selectedStartDate,
    selectedStartTime,
    selectedEndDate,
    selectedEndTime,
    startTimeData,
    endTimeData,
  ]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      await handleScheduleUserFetch();
      window.location.reload();
      closeClick?.();
    } catch (error) {
      console.error('Failed to add schedule:', error);
    }
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
    setStartTimeData(Time);
    setSelectedStartTime(Time);
    setSelectedStartDate(selectedStartDate + ' ' + Time);
  };

  const handleEndTimeClick = (Time: string) => {
    setEndTimeData(Time);
    setSelectedEndTime(Time);
    setSelectedEndDate(selectedEndDate + ' ' + Time);
  };

  const handleStartDateChange = (date: string) => {
    setSelectedStartDate(date);
    setFormData((prevData) => ({
      ...prevData,
      startDateTime: date + ' ' + selectedStartTime,
    }));
  };

  const handleEndDateChange = (date: string) => {
    setSelectedEndDate(date);
    setFormData((prevData) => ({
      ...prevData,
      endDateTime: date + ' ' + selectedEndTime,
    }));
  };

  const handleScheduleUserFetch = () => {
    const data = {
      title: formData.title,
      startDateTime: formData.startDateTime,
      endDateTime: formData.endDateTime,
      content: formData.content,
    };
    console.log('Data to be sent:', data);
    if (user) {
      userFetchData({
        newPath: `schedule/${selectedSchedule.id}`,
        newMethod: 'PATCH',
        newData: formData,
      });
    } else if (team) {
      teamFetchData({
        newPath: `schedule/${selectedSchedule.id}`,
        newMethod: 'PATCH',
        newData: formData,
      });
    }
    closeClick?.();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                hookform={register('title', { required: true, maxLength: 20 })}
                className={`${inputTextSize} ${borderStyle}`}
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
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
                id="content"
                type="text"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
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
              onStartClickTime={handleStartTimeClick}
              onEndClickTime={handleEndTimeClick}
              startValue={selectedStartDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              endValue={selectedEndDate}
              onModalEndDateClick={handleEndDateClick}
            />
          </ModalFormBorder>
          <TextButton
            buttonSize="md"
            className="mt-16 text-body4-bold text-point_red"
            color="black"
            onClick={() => handleScheduleUserFetch()}
          >
            수정완료
          </TextButton>
        </form>
      </ModalLayout>
    </>
  );
}

export default ScheduleEditModal;
