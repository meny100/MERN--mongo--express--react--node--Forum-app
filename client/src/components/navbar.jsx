import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import categories from "../assets/categories";

class Navbar extends Component {
  state = {};
  render() {
    let active = { fontWeight: "bold", color: 'teal', background: "rgb(235, 241, 247)", borderRadius:"5px"};
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container">
          <NavLink className="nav-item nav-link" to="/">
            <img
              height="45"
              src="https://www.thebankersblog.com/wp-content/uploads/2020/07/Bankers-forum.jpg"
              alt="forum img"
              srcSet=""
            />
          </NavLink>
          <NavLink
            className="nav-item nav-link text-secondary font-weight-bold" exact={true} activeStyle={active}
            to="/"
          >
            Home Page
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link text-secondary" to="/my-posts" activeStyle={active}>
                      Manage Your Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-item nav-link text-secondary" to="/favorites" activeStyle={active}>
                      Favorites
                    </NavLink>
                  </li>
                  <li>
                    {/* categories */}
                    <div className="dropdown ml-2">
                      <button
                        className="btn btn-light dropdown-toggle p-2 bg-white"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Search By Category
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <NavLink
                          className="dropdown-item"
                          onClick={() =>
                            setTimeout(() => {
                              window.location.reload();
                            }, 0.001)
                          }
                          to="/category/all-categories"
                        >
                          All Categories
                        </NavLink>
                        {categories.map((category, index) => (
                          <NavLink
                            key={index}
                            className="dropdown-item"
                            to={`/category/${category.toLowerCase()}`}
                            onClick={() =>
                              setTimeout(() => {
                                window.location.reload();
                              }, 0.001)
                            }
                          >
                            {category}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item mr-5">
                    <NavLink className="nav-item nav-link" to="/sign-in" activeStyle={active}>
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item mr-5">
                    <NavLink className="nav-item nav-link" to="/sign-up" activeStyle={active}>
                      Signup
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {user && (
                <React.Fragment>
                  <li className="nav-item mr-5">
                    <NavLink className="nav-item  btn btn-info" to="/create-post">
                      Write Post
                    </NavLink>
                  </li>
                  <li className="nav-item mr-4">
                    <NavLink className="nav-item nav-link text-secondary" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
