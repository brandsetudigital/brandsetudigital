import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Style/Home.css";
import "../../App.css";
import "../../Style/Services.css";

const PostModal = ({ show, onHide, post }) => {
  const navigate = useNavigate();

  if (!post) return null;

  const handleGetInTouch = () => {
    onHide();               // close modal first
    navigate("/contact");  // navigate to contact page
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="modern-modal fade-in-modal"
    >
      <div className="row g-0">
        {/* LEFT IMAGE */}
        {post.img && (
          <div className="col-md-5 d-none d-md-block">
            <div className="h-100 overflow-hidden">
              <img
                src={post.img}
                alt={`${post.title} — BrandSetu Digital service detail`}
                className="img-fluid h-100 w-100 modal-img"
                width="500"
                height="600"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        {/* RIGHT CONTENT */}
        <div
          className={`col-md-${post.img ? "7" : "12"} bg-dark p-4 d-flex flex-column`}
        >
          <h3 className="fw-bold mb-2 text-white">{post.title}</h3>

          <p className="text-white mb-4">
            {post.description}
          </p>

          {/* DETAILS LIST */}
          <div className="flex-grow-1">
            <h5 className="fw-bold mb-3 text-white">What we offer:</h5>
            <ul className="list-unstyled">
              {post.details.map((item, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start mb-2"
                >
                  <span className="me-2  text-success fw-bold">✔</span>
                  <span className=" text-white text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={handleGetInTouch}
              className="main-btn rounded-pill px-5 py-3 d-flex align-items-center gap-2"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
