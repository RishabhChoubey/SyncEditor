import { memo, useCallback, useEffect, useRef } from "react";
import TextEditor from "./component/TextEditor";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { logoutAction, getRefresh } from "./action/userAction";
import HomePage from "./component/HomePage";
import User from "./component/UserAuthenticate";
import Documents from "./component/Documents";
import { useDispatch, useSelector } from "react-redux";
import Main from "./component/Main";
import axios from "axios";
import ProtectedRoute from "./component/ProtectedRoute";
import Loading from "./component/Loading";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/auth" element={<User />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/doc" element={<Documents />}></Route>
            <Route index element={<HomePage />}></Route>
            <Route
              path="/document/:id"
              element={<TextEditor></TextEditor>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
