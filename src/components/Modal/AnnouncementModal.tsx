import { SubmitHandler, useForm } from 'react-hook-form';
import TextButton from '@/components/common/TextButton';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';

interface Inputs {
  title: string;
  content: string;
}

interface AnnouncementModalProps {
  reloadAnnouncements: () => void;
  closeClick: () => void;
  teamId: number;
}
export default function AnnouncementModal({
  reloadAnnouncements,
  closeClick,
  teamId,
}: AnnouncementModalProps) {
  const { fetchData } = useAxios({});
  const { user } = useUserContext();
  const { register, watch, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ content, title }, event) => {
    const createAnnouncement = {
      content: content,
      title: title,
    };
    handlePostAnnouncement(createAnnouncement);
    event?.target.closest('dialog').close();
  };

  const handlePostAnnouncement = async (data: Inputs) => {
    await fetchData({
      newPath: `announcement/${teamId}`,
      newMethod: 'POST',
      newData: data,
    });
    reloadAnnouncements();
  };

  const formTextSize = 'text-body3-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  const inputTextSize = 'text-body3-regular';
  return (
    <ModalLayout title="공지사항 게시하기" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-16 flex items-center gap-4">
          <img
            src={user?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
          />
          <p className=" text-[1.4rem]">{user?.username}</p>
        </div>
        <div className="mb-16">
          <ModalLabel htmlFor="title" label="제목" className={`${formTextSize}`} />
          <ModalInput
            hookform={register('title')}
            id="title"
            name="title"
            className={`${inputTextSize} ${borderStyle}`}
            placeholder="제목을 입력해 주세요."
          />
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="내용" className={`${formTextSize}`} />
          <textarea
            {...register('content')}
            placeholder="내용을 입력해 주세요."
            id="content"
            name="content"
            className={`h-[23.8rem] w-[38.1rem] px-[1.8rem] pb-[1.2rem] pt-[1.8rem] ${borderStyle} mb-[0.8rem] text-body3-regular`}
            maxLength={200}
          />
        </div>
        {watch('content') ? (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('content').length}/200</p>
        ) : (
          <p className=" mb-[0.9rem] flex justify-end text-gray50">0/200</p>
        )}
        <TextButton buttonSize="md" className="">
          작성하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}
