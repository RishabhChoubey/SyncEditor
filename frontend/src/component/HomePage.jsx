import React, { useState, useEffect, memo } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useEmail from "../utility/useEmail";
const HomePage = () => {
  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const history = useNavigate();
   const [error,setError] =useState(false)
  const create = (e) => {
    if (name.trim() == "") return;
    if(!useEmail(name)) {
      setError(state=>state=true)
      return
    }
    let firstName = name.split("@")[0] + "-" + uuidv4();
    let lastName = name.split("@")[1];
    history(`/document/${firstName}?last=${lastName}`);
  };
  const open = (e) => {
    if (url.trim() == "") return;

    window.open(url);
  };

  return (
    <>
      <div className=" gap-10 w-[100%] min-h-[100vh] flex flex-col bg-red-800 justify-center items-center p-4 ">
        <div className="container p-2">
          <label name="email" className="input md:w-[50%]">
            Enter participant email:
          </label>
          <input
            onChange={(e) =>{setError(state=>state=false)
             setname(e.target.value)}}
            placeholder="Participant email"
            className={`input md:w-[50%] rounded-2xl ${error? 'text-red-700 bg-red-300':""}`}
            type="email"
          />
          
          <button
            className=" w-full md:w-[50%] relative group"
            type="button"
            onClick={(e) => create(e)}
          >
            <span className="shadow group-active:bg-black translate-y-[5px] group-active:translate-y-[3px]"></span>
            <div className="front group-active:translate-x-[2px]"> create</div>
          </button>
        </div>
        <div className="container p-2">
          <label name="email" className="input md:w-[50%]">
            Doc link:
          </label>
          <input
            onChange={(e) => seturl(e.target.value)}
            placeholder="url"
            className="input md:w-[50%] rounded-2xl "
          />

          <button
            className=" w-full md:w-[50%] relative group"
            type="button"
            onClick={() => open()}
          >
            <span className="shadow group-active:bg-black translate-y-[5px] group-active:translate-y-[3px]"></span>
            <div className="front group-active:translate-x-[2px]"> open</div>
          </button>
        </div>
      </div>
    </>
  );
};
export default memo(HomePage);
