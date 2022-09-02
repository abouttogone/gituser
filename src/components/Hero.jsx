import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../assets/Search.svg";

const Hero = () => {
  const [value, setvalue] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${value}`);
  };

  const handlechange = (e) => {
    e.preventDefault();
    setvalue(e.target.value);
  };

  return (
    <div className="hero">
      <form onSubmit={handlesubmit}>
        <img src={Search} alt="" />
        <input
          onChange={handlechange}
          type="text"
          placeholder="Enter Username of any Github user"
        />
        <button type="submit"><img src={Search} alt="" /></button>
      </form>
    </div>
  );
};

export default Hero;
