import { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import InputForm from '../components/InputForm';

function Main() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState({
    writeModal: false,
    updateModal: false,
  });

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [modal.writeModal, modal.updateModal]);

  const deletePost = async id => {
    await axios.delete(`${process.env.REACT_APP_URL}/posts/${id}`);
    fetchData();
  };

  return (
    <DefaultLayout>
      {!modal.writeModal && !modal.updateModal && (
        <div className="w-[50rem] h-[50rem] relative">
          <div className="w-[30rem] h-[40rem] bg-red-400 rounded-md p-4 mx-auto mt-[5rem]">
            <div className="mb-4 text-3xl tracking-widest text-center font-nanum-eb">
              LIST
            </div>
            <ul className="w-full text-center bg-white">
              <li className="flex font-nanum-bold">
                <div className="w-[10%]">글번호</div>
                <div className="w-[40%]">제목</div>
                <div className="w-[30%]">작성자</div>
                <div className="w-[10%]">수정</div>
                <div className="w-[10%]">삭제</div>
              </li>
              {posts?.map(post => (
                <li key={post.POST_ID} className="flex">
                  <div className="w-[10%]">{post.POST_ID}</div>
                  <div className="w-[40%]">{post.POST_TITLE}</div>
                  <div className="w-[30%]">{post.POST_WRITER}</div>
                  <button
                    className="w-[10%]"
                    onClick={() => {
                      setModal(() => {
                        return {
                          updateModal: true,
                          POST_ID: post.POST_ID,
                          POST_TITLE: post.POST_TITLE,
                          POST_CONTENT: post.POST_CONTENT,
                          POST_WRITER: post.POST_WRITER,
                        };
                      });
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="w-[10%]"
                    onClick={() => {
                      deletePost(post.POST_ID);
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="absolute px-2 py-1 text-white bg-black rounded-sm bottom-9 right-40"
            onClick={() => {
              setModal(() => {
                return {
                  writeModal: true,
                };
              });
            }}
          >
            글쓰기
          </button>
        </div>
      )}
      {(modal.writeModal || modal.updateModal) && (
        <InputForm modal={modal} setModal={setModal} />
      )}
    </DefaultLayout>
  );
}

export default Main;
