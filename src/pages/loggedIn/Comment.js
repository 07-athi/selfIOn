import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Comment = (props) => {
  const { comment } = props;
  const [isFullContentVisible, setIsFullContentVisible] = useState(false);

  const toggleFullContent = () => {
    setIsFullContentVisible(!isFullContentVisible);
  };
  //truncate string
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const truncatedContent = truncateString(comment?.info, 100);
  const displayContent = isFullContentVisible
    ? comment?.info
    : truncatedContent;
  return (
    <div>
      <div className=" mt-4 mb-1 flex justify-start items-start">
        <img
          className="sm:h-7 h-6  border-white sm:w-[5%]"
          src={comment?.userPic}
        />
        <div className="ml-1 sm:w-[20%]">
          <p className="text-white sm:ml-3 ml-2 ">
            {comment?.username}
          </p>
          <div className="sm:hidden">
            <p className=" overflow-hidden ml-2 text-slate-400 overflow-ellipsis">
              {displayContent}
            </p>
          </div>
          <div className="sm:hidden">
            {!isFullContentVisible && comment?.info.length > 30 && (
              <button
                className="text-blue-500 ml-2 hover:text-blue-300"
                onClick={toggleFullContent}
              >
                Read More...
              </button>
            )}
          </div>
        </div>
        {/*<p className='text-white ml-3'>{comment?.info}</p>*/}
        <div className="hidden md:block sm:w-[75%] ">
          <div>
            <p className=" overflow-hidden text-slate-400 overflow-ellipsis">
              {displayContent}
            </p>
          </div>
          <div className="hidden md:block">
            {!isFullContentVisible && comment?.info.length > 100 && (
              <button
                className="text-blue-500 hover:text-blue-300"
                onClick={toggleFullContent}
              >
                Read More...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
