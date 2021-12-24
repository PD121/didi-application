import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogDetails.css";

import { projectFirestore } from "../../firebase/config";
import Modal from "../../components/Modal/Modal";

import { useAuthContext } from "../../hooks/useAuthContext";

const BlogDetails = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  // const { data: blogPost, isPending, error } = useFetch("http://localhost:3000/blogs/" + id)
  const history = useHistory();
  const { user } = useAuthContext();

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("blogposts")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setData(doc.data());
        } else {
          setIsPending(false);
          setError("此文章不存在");
        }
      });
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/blogs");
      }, 5000);
    }
  }, [error, history]);

  const handleGoBack = () => {
    history.push("/blogs");
  };

  const handleDelete = () => {
    projectFirestore.collection("blogposts").doc(id).delete();
    handleGoBack();
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="btn-wrapper">
        <button className="return-btn" onClick={handleGoBack}>
          返回
        </button>
        {user && (
          <button className="delete-btn" onClick={handleModal}>
            刪除文章
          </button>
        )}
      </div>

      {isPending && <p>Loading blog post...</p>}
      {error && <h3 className="error-message">{error}</h3>}

      {data && (
        <div className="blog-details-wrapper">
          <h2 className="blog-details-title">{data.title}</h2>
          <p className="blog-details-date">{data.date}</p>
          <p className="blog-details-body">{data.body}</p>
          <img src={data.image} alt="" className="blog-details-img" />
        </div>
      )}

      {showModal && (
        <Modal handleModal={handleModal} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default BlogDetails;
