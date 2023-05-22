import React from "react";
import Navbar from "../components/Navbar";
import "./styles.css";
import logo from "../components/logo.png";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavAftLog from "../components/NavAftLog";

const Main = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="bg-gradient-to-r from-slate-300 to-white h-screen">
      {user ? <NavAftLog/> : <Navbar />}
      <div className="mt-24 ">
        <div className="sm:text-4xl text-2xl font-bold text-center  font-serif flex justify-center items-center">
          <span className="animate-slow-appear animate-delay-0.5s bg-gradient-to-r from-purple-900 to-slate-800 text-transparent bg-clip-text mr-4" >Welcome</span>
          <span className="animate-slow-appear opacity-1 mr-4 animate-delay-1s bg-gradient-to-r from-purple-900 to-slate-950 text-transparent bg-clip-text">to</span>
          <span className="animate-slow-appear opacity-1 animate-delay-2s bg-gradient-to-r from-purple-900 to-slate-950 text-transparent bg-clip-text">SelfIOn</span>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
      <img className="h-44" src={logo} alt="alt" />
      </div>
      <div className="flex text-4xl p-3  sm:text-5xl justify-center items-center text-teal-900 font-bold mt-12 sm:mt-16"><p>Unleash  your  social  world  with our vibrant and interactive <span className="font-serif bg-gradient-to-r from-green-700 to-red-500 text-transparent bg-clip-text sm:mt-8 sm:flex justify-center items-center">SelfIOn</span></p></div>
    </div>
  );
};

export default Main;
