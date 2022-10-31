import { useContext } from "react";
import { NavLink } from "react-router-dom";
import DataContext from "../Contexts/DataContext";

function Nav({ status }) {
  const { showLinks, setShowLinks } = useContext(DataContext);

  return (
    <div className="container">
      <div className="row">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark col-12">
          <div className="container-fluid">
            <span className="navbar-brand">Siuvykla</span>
            <div>
              <div className="navbar-nav" id={showLinks ? "hidden" : ""}>
                {status === 2 || status === 3 || status === 4 ? (
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                ) : null}
                {status === 2 || status === 3 || status === 4 ? (
                  <NavLink
                    to="/myorders"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    My Orders
                  </NavLink>
                ) : null}
                {status === 3 ? (
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Orders
                  </NavLink>
                ) : null}
                {status === 3 ? (
                  <NavLink
                    to="/clothes"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Clothes
                  </NavLink>
                ) : null}
                {status !== 1 ? (
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                ) : null}
                {status === 1 ? (
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                ) : null}
                {status === 1 ? (
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                ) : null}
              </div>
              <button
                className="menu-btn"
                onClick={() => setShowLinks(!showLinks)}
              >
                Menu
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
