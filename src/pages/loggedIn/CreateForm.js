import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavAftLog from "../../components/NavAftLog";
import Optionbar from "../../components/Optionbar";
import logo from "../../components/logo.png";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must enter a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
      userPic: user?.photoURL,
    });
    navigate("/logged")
  };

  return (
    <div className="h-screen bg-gradient-to-r from-slate-950 to-slate-500 overflow-x-hidden">
      <NavAftLog />
      <div className=" sm:flex justify-between items-center">
        <div className=" sm:w-4/5 ">
          <div className="  sm:p-12 ">
            <div className="mt-24 sm:mt-16 sm:mb-8 mb-12 flex justify-center items-center">
              <div
                className="bg-gradient-to-r from-white to-blue-900 text-transparent bg-clip-text font-bold font-serif ml-0 text-4xl
              "
              >
                <h3>New Post</h3>
              </div>
            </div>
            <div className="sm:mb-20 flex justify-center items-center">
              <form
                className="flex-col border-transparent shadow-black shadow-2xl rounded-3xl  bg-slate-200  sm:w-2/5  sm:p-10 p-5"
                onSubmit={handleSubmit(onCreatePost)}
              >
                <div className="flex mt-12 justify-center items-center">
                  <input
                    className="block shadow-lg mt-1 w-44 h-9 border rounded-md outline-none"
                    placeholder="Title.."
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className=" text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="flex justify-center items-center ">
                  <textarea
                    className="h-24 shadow-lg mt-5 block w-64 border rounded-md outline-none"
                    placeholder="Description.."
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex justify-center items-center transition-transform transform hover:-translate-y-0.5 hover:scale-100">
                  <input
                    className="bg-slate-950 font-semibold  border-transparent rounded-xl w-32 mt-8 h-10 block cursor-pointer  text-white"
                    type="submit"
                    value="Post"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Optionbar />
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
