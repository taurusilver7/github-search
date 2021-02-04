import React, { useContext, useEffect, useState } from "react";

import MockUser from "./MockData/MockUser";
import MockFollower from "./MockData/MockFollower";
import MockRepo from "./MockData/MockRepos";

import axios from "axios";

export const rootURL = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(MockUser);
  const [followers, setFollowers] = useState(MockFollower);
  const [repos, setRepos] = useState(MockRepo);

  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  //   error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // console.log(user);
    toggleError();
    setLoading(true);

    const response = await axios(`${rootURL}/users/${user}`).catch((error) =>
      console.log(error)
    );
    console.log(response);

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootURL}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }
  };

  //check rate
  const checkRequests = () => {
    axios(`${rootURL}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // throw an error & hide search button to tell requests are used up.
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  //errors
  useEffect(checkRequests, []);

  //   get intial user
  useEffect(() => {
    searchGithubUser("taurusilver7");
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGithubValue = () => useContext(GithubContext);

export { GithubProvider, GithubContext };
