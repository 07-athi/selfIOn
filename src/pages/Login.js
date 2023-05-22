import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import goog from "./google-logo.png";
import logo from "../components/logo.png";
import {useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/logged");
  };

  return (
    <div>
        <Navbar/>
        <div className="flex justify-center items-center flex-col mt-12  sm:mt-24">
      <div className="flex justify-center items-center sm:p-16 p-6 flex-col border shadow-2xl rounded-2xl sm:w-2/5 w-4/5">
        <div>
          <img className="sm:h-24 h:1 w-32" alt="logo" src={logo} />
        </div>

        <div className="flex justify-center items-center">
          <p className="bg-gradient-to-r from-slate-950 to-slate-400 text-transparent bg-clip-text block font-bold  font-serif text-lg sm:text-2xl p-12 pt-0">
            Sign In to SelfIOn
          </p>
        </div>

        <div className="flex transition-transform transform hover:-translate-y-0.5 hover:scale-100 bg-slate-200 justify-center items-center p-2 border border-slate-200 rounded-3xl sm:w-72">
          <img src={goog} alt="google" className="h-9" />
          <button className="font-semibold " onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>

        <div>
          <p className="flex justify-center items-center mt-24">
            Click “Sign In” to agree to SelfIOn’s Terms of Service and
            acknowledge that SelfIOn’s Privacy Policy applies to you.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
