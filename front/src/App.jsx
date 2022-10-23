import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  //useNavigate,
} from "react-router-dom";
import "./App.scss";
import Nav from "./Components/Nav";
import Home from "./Components/home/MainH";
import Clothes from "./Components/clothes/MainC";
import Orders from "./Components/orders/MainO";
import MyOrders from "./Components/myorders/MainMO";
import LoginPage from "./Components/loging/LoginPage";
import LogoutPage from "./Components/loging/LogoutPage";
// import RegisterPage from "./Components/register/Main";
import { authConfig } from "./Functions/auth";

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());

  return (
    <BrowserRouter>
      <ShowNav roleChange={roleChange} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth role="user">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/myorders"
          element={
            <RequireAuth role="user">
              <MyOrders />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/login"
          element={<LoginPage setRoleChange={setRoleChange} />}
        />
        <Route
          path="/logout"
          element={<LogoutPage setRoleChange={setRoleChange} />}
        />
        <Route
          path="/clothes"
          element={
            <RequireAuth role="admin">
              <Clothes />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <RequireAuth role="admin">
              <Orders />
            </RequireAuth>
          }
        ></Route>
        {/* <Route
          path="/register"
          element={<RegisterPage setRoleChange={setRoleChange} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

function ShowNav({ roleChange }) {
  const [status, setStatus] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=admin", authConfig())
      .then((res) => {
        setStatus(res.data.status);
      });
  }, [roleChange]);
  return <Nav status={status} />;
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=" + role, authConfig())
      .then((res) => {
        if ("ok" === res.data.msg) {
          setView(children);
        } else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children, role]);

  return view;
}

export default App;
