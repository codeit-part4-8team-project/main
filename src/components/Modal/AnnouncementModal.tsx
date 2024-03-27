import { SubmitHandler, useForm } from 'react-hook-form';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';

type Inputs = {
  title: string;
  content: string;
};

interface AnnouncementModalProps {
  closeClick: () => void;
}
// 나중에 title 프롭으로 받기

export default function AnnouncementModal({ closeClick }: AnnouncementModalProps) {
  const { fetchData } = useAxios({});
  const { register, watch, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createFreeBoard = {
      content: data.content,
      title: data.title,
    };
    handlePostAnnoucement(createFreeBoard);
    console.log(createFreeBoard);
  };
  const teamId = 22;

  const handlePostAnnoucement = (data: Inputs) => {
    fetchData({
      newPath: `${teamId}/annoucement/`,
      newData: data,
    });
  };

  const formTextSize = 'text-body3-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';
  return (
    <ModalLayout title="공지사항 게시하기" closeClick={closeClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-16 flex items-center gap-4">
          <img src={profile} alt="profile" />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">userNickName</p>
          {/*  */}
        </div>
        <p>{title}</p>
        <div></div>
        <div className="flex flex-col gap-[0.8rem]">
          <ModalLabel htmlFor="content" label="내용*" className={`${formTextSize}`} />
          <textarea
            {...register('content')}
            placeholder="내용을 입력해 주세요."
            id="content"
            name="content"
            className={`h-[23.8rem] w-[38.1rem] px-[1.8rem] pb-[1.2rem] pt-[1.8rem] ${borderStyle} mb-[0.8rem] text-body4-regular`}
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
