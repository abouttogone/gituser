import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import link from "../assets/link.svg";
import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";
import star from "../assets/star.svg";
import forks from "../assets/forks.svg";
import fileicon from "../assets/fileicon.svg";
import location from "../assets/location.svg";
import goto from "../assets/goto.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Navbar from "./Navbar";
import Notfound from "./Notfound";

const User = () => {
  const { username } = useParams();
  const [state, setstate] = useState("");
  const [status, setstatus] = useState("");
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [repos, setrepos] = useState([]);
  const [showfollowers, setshowfollowers] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);
  const [loading, setloading] = useState(true);

  const navigate = useNavigate();

  let headersList = {
    Accept: "*/*",
    Authorization: "GITHUB_AUTH",
  };

  let fetchdata = {
    url: `https://api.github.com/users/${username}`,
    method: "GET",
    headers: headersList,
  };

  let getfollowers = {
    url: `https://api.github.com/users/${username}/followers?per_page=100`,
    method: "GET",
    headers: headersList,
  };

  let getfollowing = {
    url: `https://api.github.com/users/${username}/following?per_page=100`,
    method: "GET",
    headers: headersList,
  };

  let getrepos = {
    url: `https://api.github.com/users/${username}/repos`,
    method: "GET",
    headers: headersList,
  };

  useEffect(() => {
    document.title = `${username}'s Profile | GithubUser`;

    axios.request(fetchdata).then(function (Response) {
      setstate(Response.data);
      setloading(false);
    }).catch(function (error) {
      setstatus(error.response.data.message);
    });

    axios.request(getfollowers).then(function (Response) {
      setfollowers(Response.data);
    });

    axios.request(getfollowing).then(function (Response) {
      setfollowing(Response.data);
    });

    axios.request(getrepos).then(function (Response) {
      setrepos(Response.data);
    });
  }, []);

  return (
    <>
      {status == "Not Found" ? (
        <Notfound />
      ) : (
        <div className="main">
          <div className="container">
            <Navbar search="true" />
            {loading ? (
              <div className="loader">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="content">
                <div className="flx">
                  <div className="userimg">
                    <LazyLoadImage
                      effect="blur"
                      src={state == undefined ? null : state.avatar_url}
                      alt=""
                    />
                  </div>
                  <div className="userdata">
                    <h2>
                      {state == undefined ? null : state.name}
                      <span>{state == undefined ? null : state.company}</span>
                    </h2>
                    <p className="about">
                      About :
                      {state == undefined
                        ? null
                        : state.bio == null
                        ? "Nothing"
                        : state.bio}
                    </p>
                    <div className="fol">
                      <p
                        onClick={() => {
                          setshowfollowers(!showfollowers);
                        }}
                      >
                        {state == undefined ? null : state.followers}
                        <span> Followers</span>
                      </p>
                      <p
                        onClick={() => {
                          setshowfollowing(!showfollowing);
                        }}
                      >
                        {state == undefined ? null : state.following}
                        <span> Following</span>
                      </p>
                    </div>

                    <p className="joined">
                      Joined on :
                      <span>
                        {state == undefined ? null : state.created_at}
                      </span>
                    </p>
                    <div className="otherinfo">
                      {state.blog == null ? null : (
                        <a href={state == undefined ? null : state.blog}>
                          <img src={link} alt="" />
                          {state.blog}
                        </a>
                      )}

                      <a href={state == undefined ? null : state.html_url}>
                        <img src={github} alt="" />
                        {state.login}
                      </a>

                      {state.location == null ? null : (
                        <span>
                          <img src={location} alt="" />
                          {state.location}
                        </span>
                      )}

                      {state.twitter_username == null ? null : (
                        <span>
                          <img src={twitter} alt="" />
                          {state.twitter_username}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {showfollowers == true ? (
                  <div className="socialbox">
                    <div
                      onClick={() => {
                        setshowfollowers(!showfollowers);
                      }}
                      className="closeoverlay"
                    ></div>
                    <div className="bx">
                      <h2 className="indicator">{state.login}'s followers</h2>
                      {followers == undefined
                        ? null
                        : followers.map((e, i) => (
                            <div key={i} className="person">
                              <div className="details">
                                <LazyLoadImage
                                  effect="blur"
                                  src={e.avatar_url}
                                />
                                <p>{e.login}</p>
                              </div>
                              <a href={"/user/" + e.login}>
                                <button>Go to profile</button>
                              </a>
                            </div>
                          ))}
                    </div>
                  </div>
                ) : null}

                {showfollowing == true ? (
                  <div className="socialbox">
                    <div
                      onClick={() => {
                        setshowfollowing(!showfollowing);
                      }}
                      className="closeoverlay"
                    ></div>
                    <div className="bx">
                      <h2 className="indicator">{state.login}'s following</h2>
                      {following == undefined
                        ? null
                        : following.map((e, i) => (
                            <div key={i} className="person">
                              <div className="details">
                                <LazyLoadImage
                                  effect="blur"
                                  src={e.avatar_url}
                                />
                                <p>{e.login}</p>
                              </div>
                              <a href={"/user/" + e.login}>
                                <button onClick={fetchdata}>
                                  Go to profile
                                </button>
                              </a>
                            </div>
                          ))}
                    </div>
                  </div>
                ) : null}

                <div className="repos">
                  <h2>Repositories</h2>
                  <div className="reposboxes">
                    {repos == undefined ? null : repos.length == 0 ? (
                      <>
                        <div className="norepos">
                          <p>{state.login} have 0 repositories</p>
                        </div>
                      </>
                    ) : (
                      repos.map((v, n) => (
                        <div key={n} className="repo_single">
                          <img src={fileicon} alt="" />
                          <div className="">
                            <h3>{v.name}</h3>
                            <p>{v.description}</p>
                            <span>Created on : {v.created_at}</span>
                          </div>
                          <div className="infos">
                            <span>
                              <img src={star} alt="" />
                              {v.stargazers_count}
                            </span>
                            <span>
                              <img src={forks} alt="" />
                              {v.forks}
                            </span>
                            <a href={v.html_url}>
                              <img src={goto} alt="" />
                              Visit
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
