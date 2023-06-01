import { memo, useCallback, useEffect, useRef } from "react";
import TextEditor from "./component/TextEditor";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { logoutAction ,getRefresh} from "./action/userAction";
import HomePage from "./component/HomePage";
import User from "./component/UserAuthenticate";
import Documents from "./component/Documents";
import { useDispatch, useSelector } from "react-redux";
import Main from "./component/Main";
import axios from "axios";
function App() {
 const dispatch=useDispatch();
 const { userInfo,loading } = useSelector((state) => state.userSignin);

  useEffect(()=>{

  dispatch(getRefresh())

  },[])
  
  if(loading)  return <div className="bold justify-center items-center bg-slate-600 h-screen w-screen">Loading...</div>
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<User />}></Route>
          <Route path="/doc" element={<Documents />}></Route>
          <Route path="/create" element={<HomePage />}></Route>
          <Route
            path="/document/:id"
            element={<TextEditor></TextEditor>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
