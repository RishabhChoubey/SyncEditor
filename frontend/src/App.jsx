import { useCallback, useEffect, useRef } from "react";
import TextEditor from "./component/TextEditor";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { logoutAction } from "./action/userAction";
import HomePage from "./component/HomePage";
import User from "./component/UserAuthenticate";
import Documents from "./component/Documents";
import { useDispatch } from "react-redux";
import Main from "./component/Main";
function App() {
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

export default App;
