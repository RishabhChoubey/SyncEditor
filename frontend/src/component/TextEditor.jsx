import "quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import copy from "../assets/link.png";
import useChangeState from "../utility/useChangeState";
import useEditor from "../utility/useEditor";
import useSocket from "../utility/useSocket";
import "./TextEditor.css";

const TextEditor = (props) => {
  const navigate = useNavigate();
  const url = window.location;

  const [searchParams] = useSearchParams();
  const last = searchParams.get("last");
  const { id: documentId } = useParams();

  const [socket, setsocket] = useState();

  const [quill, setquill] = useState();
  let intervalTime;
  const onFocus = (e) => {
    if (document.visibilityState == "hidden") {
      intervalTime = setInterval(() => {
        window.location.reload();
      }, 30000);
    }
    if (document.visibilityState == "visible") {
      clearInterval(intervalTime);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  const { userInfo, loading } = useSelector((state) => state.userSignin);
  const user = userInfo;
  const createdFor = { id: documentId.split("-")[0] + "@" + last };
  const participant = user?.id == createdFor?.id ? user?.id : createdFor?.id;
  useEffect(() => {
    if (
      (loading == false || loading != undefined) &&
      (user == null || participant == null)
    )
      navigate("/auth");
  }, [user]);

  const handleCopy = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(url.href);
    alert(`URL Copied :  ${url.href}`);
  };

  const wrapperRef = useEditor(setquill);

  useSocket(setsocket);

  useChangeState(quill, socket, documentId, user, participant);

  return (
    <>
      <div
        className="absolute left-[.25rem] top-[3rem] z-[10] h-5 w-5"
        onClick={handleCopy}
      >
        <img
          src={copy}
          alt="copy"
          className="h-full w-full active:scale-110 cursor-pointer"
        />
      </div>
      <div
        className="w-[100%] h-[100%] bg-red-800 flex flex-col justify-center items-center relative p-3"
        ref={wrapperRef}
      ></div>
    </>
  );
};

export default TextEditor;
