import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PopupModal from '../Modal/PopupModal';
import ScheduleEditModal from './ScheduleEditModal';
import TextButton from '@/components/common/TextButton';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalScheduleCalendarInput from '@/components/common/modal/ModalScheduleCalendarInput';
import { Schedule } from '@/contexts/CalenarProvider';
import { calendarContext } from '@/contexts/CalenarProvider';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import useScheduleData from '@/hooks/useScheduleData';
import EditPenIcon from '@/assets/EditPenIcon';

interface ScheduleDeleteModalProps {
  onModalStartDateClick?: (date: string) => void;
  onModalEndDateClick?: (date: string) => void;
  onStartTimeClick?: (time: string) => void;
  onEndTimeClick?: (time: string) => void;
  closeClick?: () => void;
  user?: boolean;
  team?: boolean;
  teamId?: string;
  selectedSchedule: Schedule;
  setSelectedSchedule?: (schedule: Schedule) => void;
  onClick?: () => void;
  calendarType?: '나' | '팀';
}
type Inputs = {
  title: string;
  startDateTime: string;
  endDateTime: string;
  content: string;
};
// 여기는 user인지 team인지 구분이 필요함
// 합칠때 teamId 에러가 계속 떠서 일단 기본값 넣어줌
function ScheduleDeleteModal({
  closeClick,
  user = false,
  onClick,
  selectedSchedule,
  calendarType,
  teamId,
}: ScheduleDeleteModalProps) {
  const { fetchData: userFetchData } = useAxios({});
  const { fetchData: teamFetchData } = useAxios({});
  const { user: userInformation } = useUserContext();
  const { setSchedules, setFilteredSchedules } = useContext(calendarContext);

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const openModal = useModal();

  const onSubmit: SubmitHandler<Inputs> = async (selectedSchedule) => {
    try {
      await handleScheduleUserFetch(selectedSchedule);
      //window.location.reload();
    } catch (error) {
      console.error('Failed to add schedule:', error);
    }
  };
  const titleWatch = watch('title');
  const contentWatch = watch('content');

  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const InputValueLength = 'mb-[0.9rem] flex justify-end text-gray50';
  const disabledStyle = 'bg-gray10';

  const handleScheduleUserFetch = async (data: Inputs) => {
    const fetchDataFunction = user ? userFetchData : teamFetchData;

    const path =
      calendarType === '나'
        ? `schedule/${selectedSchedule.id}`
        : `schedule/team/${teamId}/${selectedSchedule.team?.id}`;

    try {
      await fetchDataFunction({
        newPath: path,
        newMethod: 'DELETE',
        newData: data,
      });

      closeClick?.();
    } catch (error) {
      console.error('Failed to delete schedule:', error);
    }
  };

  useEffect(() => {}, [selectedSchedule, setSchedules, setFilteredSchedules]);

  const handleOpenPopupModal = () => {
    openModal(({ close }) => (
      <PopupModal
        buttonText1="취소"
        buttonClick1={() => close()}
        buttonText2="확인"
        buttonClick2={handleOpenPopupModalReplay}
      >
        <div className="mb-6  whitespace-nowrap ">keepyuppy.com 내용:</div>
        <p className="whitespace-nowrap"> 해당 이슈를 정말 삭제하시겠습니까?</p>
      </PopupModal>
    ));
  };

  const handleOpenPopupModalReplay = () => {
    openModal(({ close }) => (
      <PopupModal
        buttonText2="확인"
        buttonClick2={() => {
          handleScheduleUserFetch(selectedSchedule);
          close();

          useScheduleData({
            calendarType,
            teamId: selectedSchedule.team?.id,
            nowDate: new Date(),
            setSchedules,
            setFilteredSchedules,
            onUpdateData: (data) => console.log('Updated data:', data),
          });
        }}
      >
        <div className=" mb-6 whitespace-nowrap">keepyuppy.com 내용:</div>
        <p className="whitespace-nowrap"> 해당 이슈가 삭제되었습니다.</p>
      </PopupModal>
    ));
  };
  const handleOpenEditModal = (schedules: Schedule[] | null) => {
    if (!schedules || schedules.length === 0) {
      return; // schedules이 null 또는 빈 배열이면 아무 작업도 수행하지 않고 함수를 종료합니다.
    }

    schedules.forEach((schedule) => {
      if (calendarType === '나') {
        openModal(({ close }) => (
          <ScheduleEditModal user={true} closeClick={close} selectedSchedule={schedule} />
        ));
      } else {
        openModal(({ close }) => (
          <ScheduleEditModal
            team={true}
            closeClick={close}
            teamId={teamId}
            selectedSchedule={schedule}
          />
        ));
      }
    });
  };
  return (
    <>
      <ModalLayout title="일정" closeClick={closeClick} onClick={onClick}>
        <EditPenIcon
          className="absolute ml-[28rem] mr-10"
          onClick={() => handleOpenEditModal([selectedSchedule])}
        />
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
                disabled={disabledStyle}
                value={selectedSchedule.title}
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
                disabled={disabledStyle}
                value={selectedSchedule.content}
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
              startValue={selectedSchedule.startDateTime}
              endValue={selectedSchedule.endDateTime}
            />
          </ModalFormBorder>
          <TextButton
            buttonSize="md"
            className="mt-16 text-body4-bold text-point_red"
            color="white"
            onClick={handleOpenPopupModal}
          >
            일정 삭제
          </TextButton>
        </form>
      </ModalLayout>
    </>
  );
}

export default ScheduleDeleteModal;
