import React from "react";
import { useNavigate } from "react-router-dom";

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <div className="fullbox">
      <div className="err">
        <span>404</span>
        <hr />
        <span>Page not Found</span>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Errorpage;
