import React, { useEffect, useState } from "react";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

const Post = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [likeNum, setLikeNum] = useState(null);
  const [isFullContentVisible, setIsFullContentVisible] = useState(false);

  const toggleFullContent = () => {
    setIsFullContentVisible(!isFullContentVisible);
  };
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  //likes
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikeNum(
      data.docs.map((doc) => ({ userId: doc.data().userId, idLike: doc.id }))
    );
  };
  const addLike = async (data) => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        //to immediately show the number of likes before refreshing,here uid=userId then that change will render to ui of user
        setLikeNum((prev) =>
          prev
            ? [...prev, { userId: user.uid, idLike: newDoc.id }]
            : [{ userId: user.uid, idLike: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {
      const queryToDel = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeDataDel = await getDocs(queryToDel);
      const likeId = likeDataDel.docs[0].id;
      const likeToBeDel = doc(db, "likes", likeId);
      await deleteDoc(likeToBeDel);
      if (user) {
        setLikeNum(
          (prev) => prev && prev?.filter((like) => like.idLike !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLikes();
  }, []);
  const hasUserLiked = likeNum?.find((like) => like.userId === user?.uid);

  //comments
  const [comments, setComments] = useState(null);
  const [addComm, setAddComm] = useState(null);
  const commentRef = collection(db, "comments");
  const commentDoc = query(commentRef, where("postId", "==", post.id));
  const getComment = async () => {
    try {
      const snapshot = await getDocs(commentDoc);
      const commentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        info: doc.data().info,
        username: doc.data().username,
        userPic: doc.data().userPic,
      }));
      setComments(commentData);
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async (data) => {
    try {
      const newDoc = await addDoc(commentRef, {
        userId: user?.uid,
        postId: post.id,
        info: addComm,
        username: user?.displayName,
        userPic: user?.photoURL,
      });
      if (user) {
        // Update the comments state with the new comment
        const newComment = {
          id: newDoc.id,
          userId: user?.uid,
          info: addComm,
          username: user?.displayName,
          userPic: user?.photoURL,
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setAddComm("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleInputChange = (e) => {
    setAddComm(e.target.value);
  };
  useEffect(() => {
    getComment();
    //console.log(comments)
  }, [comments]);

  //truncate string
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const truncatedContent = truncateString(post.description, 200);
  const displayContent = isFullContentVisible
    ? post.description
    : truncatedContent;

  return (
    <div className=" w-64 sm:w-auto sm:p-5 shadow-xl mb-5 bg-black p-5 border-transparent rounded-lg h-auto">
      <div>
        <div className="flex justify-start items-center sm:pb-0 pb-5 sm:p-7">
          <img className="border rounded-full h-10" src={post.userPic} />
          <p className="text-white ml-3">{post.username}</p>
        </div>

        <div className="sm:text-2xl text-sm font-serif sm:mb-2 mb-5 font-bold sm:p-7 sm:pb-0">
          <p className="text-white">{post.title}</p>
        </div>
        <div>
          <div>
            <p className=" overflow-hidden text-slate-200 sm:p-7 sm:py-0 sm:pt-3 overflow-ellipsis max-w-[90%]">
              {displayContent}
            </p>
          </div>
          <div>
            {!isFullContentVisible && post.description.length > 200 && (
              <button
                className="text-blue-500 sm:p-7 py-0 hover:text-blue-300"
                onClick={toggleFullContent}
              >
                Read More...
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div
              className="bg-slate-900 border-transparent mt-6 rounded-full h-9 w-9 pt-3 hover:translate-y-1  sm:ml-6 flex justify-center items-center cursor-pointer"
              onClick={hasUserLiked ? removeLike : addLike}
            >
              <div className="mb-3">
                {hasUserLiked ? <div>👎</div> : <div>&#128077;</div>}
              </div>
            </div>

            {likeNum?.length != "0" ? (
              <div>
                <p className="text-white sm:ml-3 mt-5">Likes: {likeNum?.length}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="text-white w-[50%] ml-1 mt-5">
            <button onClick={handleClick}>Comments</button>
          </div>
        </div>
        {isClicked?<div className="p-7">
          <div className="">
            <input
              onChange={handleInputChange}
              value={addComm}
              className="h-7 border-transparent rounded-md outline-none w-3/5"
              type="text"
              placeholder="type here..."
            />
            <button
              onClick={addComment}
              className="text-white bg-gradient-to-r from-black to-blue-900 ml-4 rounded-md w-12 hover:translate-x-1 font-medium"
            >
              post
            </button>
          </div>
          <div className="sm:p-3">
            {/*show comments*/}
            <div className="">
              {comments?.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>:<div>" "</div>}
      </div>
    </div>
  );
};

export default Post;
