import axios from 'axios';

function InputForm({ modal, setModal }) {
  const onSubmitHandler = async e => {
    e.preventDefault();

    if (modal.writeModal) {
      const formData = {
        title: e.target.title.value,
        content: e.target.content.value,
        writer: e.target.writer.value,
      };

      await axios.post(`${process.env.REACT_APP_URL}/posts`, formData);
      setModal(() => {
        return { writeModal: false };
      });
    } else if (modal.updateModal) {
      const formData = {
        title: e.target.title.value,
        content: e.target.content.value,
        writer: e.target.writer.value,
      };

      await axios.put(
        `${process.env.REACT_APP_URL}/posts/${modal.POST_ID}`,
        formData
      );
      setModal(() => {
        return { updateModal: false };
      });
    }
  };

  return (
    <div
      className={`${modal.writeModal && 'bg-amber-300'} ${
        modal.updateModal && 'bg-green-300'
      } w-[30rem] h-[40rem] rounded-md p-4`}
    >
      <div className="mb-4 text-3xl tracking-widest text-center font-nanum-eb">
        {modal.writeModal && 'Write'}
        {modal.updateModal && 'Update'}
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            className="w-full p-2 mb-4 outline-none"
            placeholder="제목"
            name="title"
            defaultValue={modal.updateModal && modal.POST_TITLE}
            autoFocus
          />
          <textarea
            type="text"
            className="w-full h-[26rem] outline-none p-2 resize-none"
            placeholder="내용"
            defaultValue={modal.updateModal && modal.POST_CONTENT}
            name="content"
          />
          <input
            type="text"
            className="block p-2 outline-none"
            placeholder="작성자"
            defaultValue={modal.updateModal && modal.POST_WRITER}
            name="writer"
          />

          <button type="summit" className="px-2 py-1 mt-2 mr-2 bg-white">
            {modal.writeModal && '작성'}
            {modal.updateModal && '수정'}
          </button>

          <button
            type="button"
            className="px-2 py-1 bg-white"
            onClick={() => {
              if (modal.writeModal) {
                setModal(() => {
                  return { writeModal: false };
                });
              } else if (modal.updateModal) {
                setModal(() => {
                  return { updateModal: false };
                });
              }
            }}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
