import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { FaBars } from "react-icons/fa";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavAftLog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  {
    /*to refresh the profile while signing in with a different account*/
  }
  const [showDetails, setShowDetails] = useState(false);
 

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div className="bg-slate-950 sm:relative  w-screen sm:h-auto">
        {/* Mobile View */}
        <div className="sm:hidden flex justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <img className="h-12" src={logo} alt="alt" />
          </div>

          <div className="flex justify-center items-center">
            <div className=" relative ">
              <img
                onClick={toggleDetails}
                src={user?.photoURL || " "}
                className="h-20 p-6 rounded-full"
              />
              {showDetails && (
                <div className="absolute top-full right-0 overflow-x-hidden bg-slate-100 shadow-xl rounded-lg sm:mt-9 mt-6 sm:p-4 w-64 sm:w-72">
                  <div className="flex-col justify-center items-center p-2">
                    <div className="bg-white rounded-md p-5 sm:p-5 mt-4">
                      <div className="flex justify-center items-center">
                        <div className="border rounded-full border-transparent">
                          <img
                            src={user?.photoURL || ""}
                            className="h-12 mt-4 border rounded-full border-transparent cursor-pointer"
                          />
                        </div>
                        <div className=" ml-3 text-slate-900 text-base mt-3 mb-2">
                          {user?.displayName}
                        </div>
                      </div>
                      <div className="font-semibold text-slate-800 mt-4 mb-3">
                        {user?.email}
                      </div>
                      
                    </div>

                    <div
                      onClick={() => navigate("/logged")}
                      className="bg-white hover:bg-slate-200 rounded-md p-2 mt-1 mb-1 font-semibold flex justify-center items-center cursor-pointer"
                    >
                      My page
                    </div>

                    <div className="bg-white hover:bg-slate-200 rounded-md p-5 flex  mt-1 cursor-pointer">
                      <div onClick={signUserOut} className="mt-3">
                        <RiLogoutBoxLine size={24} />
                      </div>

                      <div className="ml-3 mb-5 mt-3 ">
                        <p
                          onClick={signUserOut}
                          className="font-semibold text-slate-800"
                        >
                          signout
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 mb-5 flex justify-center items-center">
                      <p>-------------------------------------</p>
                    </div>
                    <div className="flex justify-center items-center">
                      Privacy policy • Terms of service
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsVisible((prev) => !prev)}
              className="text-gray-300 focus:text-white focus:outline-none hover:text-white"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex justify-between items-center px-10 py-4">
          <div className="flex items-center">
            <img className="h-20" src={logo} alt="alt" />
            <h1 className="text-white font-bold text-3xl font-serif">
              SelfIOn
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-white font-semibold text-xl px-5 ">
              <Link className="mr-6 hover:text-slate-400" to="/">
                Home
              </Link>
            </div>

            <div className="pr-7 relative">
              <img
                onClick={toggleDetails}
                src={user?.photoURL || " "}
                className="h-12 border rounded-full border-transparent cursor-pointer"
              />
              {showDetails && (
                <div className="absolute top-full right-0 overflow-x-hidden bg-slate-100 shadow-xl rounded-lg mt-9 p-4 w-72 x">
                  <div className="flex-col justify-center items-center ">
                    <div className="bg-white rounded-md p-5 mt-4">
                      <div className="flex justify-center items-center">
                        <div>
                          <img
                            src={user?.photoURL || " "}
                            className="h-12 mt-4 border rounded-full border-transparent cursor-pointer"
                          />
                        </div>
                        <div className=" ml-3 text-slate-900 text-base mt-3 mb-2">
                          {user?.displayName}
                        </div>
                      </div>
                      <div className="font-semibold text-slate-800 mt-4 mb-3">
                        {user?.email}
                      </div>
                    </div>
                    <div
                      onClick={() => navigate("/logged")}
                      className="bg-white hover:bg-slate-200 rounded-md p-2 mt-2 mb-2 font-semibold flex justify-center items-center cursor-pointer"
                    >
                      My page
                    </div>
                    <div onClick={signUserOut} className="bg-white hover:bg-slate-200 rounded-md p-5 flex  mt-1 cursor-pointer justify-center items-center">
                      <div>
                        <RiLogoutBoxLine size={24} />
                      </div>

                      <div className="ml-3  mb-5 mt-3 ">
                        <p
                          
                          className="font-semibold  text-slate-800"
                        >
                          signout
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 mb-5 flex justify-center items-center">
                      <p>----------------------------------------</p>
                    </div>
                    <div className="flex justify-center items-center">
                      Privacy policy • Terms of service
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View - Dropdown */}
        <div className={isVisible ? "block" : "hidden sm:hidden"}>
          <div className="text-white px-12 ">
            <Link className="block py-2 hover:text-blue-200" to="/">
              Home
            </Link>
          </div>
          <div className="pb-3">
          <Link
            className="text-white px-12 mb-4"
            to="/createPost"
          >
            Add new post
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NavAftLog;
