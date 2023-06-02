import { memo, useCallback, useEffect, useRef, useState } from "react";
import TextEditor from "./component/TextEditor";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { logoutAction, getRefresh, api } from "./action/userAction";
import HomePage from "./component/HomePage";
import User from "./component/UserAuthenticate";
import Documents from "./component/Documents";
import { useDispatch, useSelector } from "react-redux";
import Main from "./component/Main";
import axios from "axios";
import ProtectedRoute from "./component/ProtectedRoute";
import Loading from "./component/Loading";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkBackend() {
      const {
        data: { data },
      } = await api.get("/api/isready");
      console.log(JSON.stringify(data) + " server rews");
      if (data == true) setLoading(false);
    }
    checkBackend();
  }, []);

  if (loading) return <Loading message="Getting Backend Read..."></Loading>;

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
