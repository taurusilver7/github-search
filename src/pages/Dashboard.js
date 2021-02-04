/* eslint-disable no-unused-vars */
import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import { useGithubValue } from "../context/Context";
import loadingImage from "../assets/img/preloader.gif";

const Dashboard = () => {
  const { loading } = useGithubValue();

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
