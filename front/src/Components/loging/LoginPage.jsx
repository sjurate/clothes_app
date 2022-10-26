import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../Functions/auth";

function LoginPage({ setRoleChange }) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const doLogin = () => {
    axios.post("http://localhost:3003/login", { user, pass }).then((res) => {
      setRoleChange(Date.now());
      if (res.data.msg === "ok") {
        login(res.data.key);

        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card m-4">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <button
                onClick={doLogin}
                type="button"
                className="btn btn-outline-success"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
