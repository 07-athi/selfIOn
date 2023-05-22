import React, { useEffect, useState } from "react";
import NavAftLog from "../../components/NavAftLog";
import Optionbar from "../../components/Optionbar";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Post from "./Post";

const LoggedIn = () => {
  const [postsList, setPostsList] = useState(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" bg-gradient-to-r from-slate-950 to-slate-500 min-h-screen overflow-x-hidden">
      <div className="fixed"><NavAftLog /></div>
      <div className="flex sm:justify-between  sm:items-start justify-center items-center">
        <div className=" flex-col sm:w-3/5 sm:pt-1 sm:p-24 justify-center items-center ">
          <div className="text-4xl bg-gradient-to-r from-white to-blue-900 text-transparent bg-clip-text font-bold flex justify-center items-center mb-5 sm:mb-16 sm:mt-36 mt-28 font-serif">
            POSTS
          </div>
         <div className="">{postsList?.map((post)=>(<Post post={post}/>))}</div> 
        </div>

        <div className=" hidden md:block sm:mt-56">
          <Optionbar />
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
