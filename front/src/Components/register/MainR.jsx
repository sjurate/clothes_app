import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterContext from "../../Contexts/RegisterContext";
import CreateR from "./CreateR";
import { authConfig } from "../../Functions/auth";

function MainR() {
  const [createUser, setCreateUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (createUser === null) {
      return;
    }
    axios
      .post("http://localhost:3003/register", createUser, authConfig())
      .then((res) => {
        navigate("/login", { replace: true });
      });
  }, [createUser, navigate]);

  return (
    <RegisterContext.Provider
      value={{
        setCreateUser,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <CreateR />
          </div>
        </div>
      </div>
    </RegisterContext.Provider>
  );
}
export default MainR;
