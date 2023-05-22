import React from "react";
import CreateForm from "../pages/loggedIn/CreateForm";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Optionbar = () => {
  const navigate = useNavigate();
  return (
    <div className="mr-8 border-transparent shadow-xl rounded-lg bg-slate-950 ">
      <div className="h-96 w-64 pt-16">
        <div className="flex mb-8 justify-center items-center">
          <div className="h-4 bg-white w-5 rounded-md flex justify-center">
            <FiArrowRight />
          </div>
          <div>
            <Link
              className="text-white ml-3 flex justify-center hover:text-slate-400 "
              to="/logged"
            >
              Go to main page
            </Link>
          </div>
        </div>
        <div className="  flex justify-center items-start">
          <div className="h-4 w-5 cursor-pointer border rounded-md mt-1 bg-white">
            <FiArrowRight />
          </div>
          <div>
            <Link
              className="text-white ml-3 flex justify-center hover:text-slate-400 "
              to="/createPost"
            >
              Add new post
            </Link>
          </div>
        </div>
      </div>
      <div className="text-slate-400 flex justify-center">
        <p>Privacy policy • Terms of service</p>
      </div>
    </div>
  );
};

export default Optionbar;
