import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import socketio from "socket.io-client";

import "./TextEditor.css";
import copy from "../assets/link.png";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import useEditor from "../utility/useEditor";
import useSocket from "../utility/useSocket";
import useChangeState from "../utility/useChangeState";
import Loading from "./Loading";

const TextEditor = (props) => {
  const navigate = useNavigate();
  const url = window.location;
  console.log(url.href);
  const [searchParams] = useSearchParams();
  const last = searchParams.get("last");
  const { id: documentId } = useParams();
  console.log(documentId, " ", last);
  const [socket, setsocket] = useState();

  const [quill, setquill] = useState();
  let intervalTime;
  const onFocus = (e) => {
    if (document.visibilityState == "hidden") {
      intervalTime = setInterval(() => {
        console.log("refresh....");
        window.location.reload();
      }, 60000);
      console.log(intervalTime);
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
