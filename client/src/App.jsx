import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/home";
import Navbar from "./components/navbar";
import userService from "./services/userService";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import CreatePost from "./components/createPost";
import PostsByCategory from "./components/postsByCategory";
import Comments from "./components/comments";
import Favorites from "./components/favorites";
import MyPosts from "./components/myPosts";
import DeletePost from "./components/deletePost";
import EditPost from "./components/editPost";
import EditUser from "./components/editUser";

class App extends Component {
  state = {};

  async componentDidMount() {
    //check in front if there is a connected user
    const user = userService.getCurrentUser();
    if (user) {
      let { data } = await userService.getCurrentUserDetails();
      this.setState({ user: data });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 800, background: "rgb(241, 244, 247)" }}>
          <div className="container bg-light">
            <div className="row">
              <div className="col-9">
                <Switch>
                  <Route path="/sign-up" component={Signup} />
                  <Route path="/sign-in" component={Signin} />
                  <ProtectedRoute path="/logout" component={Logout} />
                  <ProtectedRoute path="/edit-user" component={EditUser} />
                  <ProtectedRoute path="/create-post" component={CreatePost} />
                  <ProtectedRoute
                    path="/category/:id"
                    component={PostsByCategory}
                  />
                  <ProtectedRoute path="/comments/:id" component={Comments} />
                  <ProtectedRoute path="/favorites" component={Favorites} />
                  <ProtectedRoute
                    path="/my-posts/delete/:id"
                    component={DeletePost}
                  />
                  <ProtectedRoute
                    path="/my-posts/edit/:id"
                    component={EditPost}
                  />
                  <ProtectedRoute path="/my-posts" component={MyPosts} />
                  <Route
                    path="/"
                    render={(props) => <Home {...props} user={user} />}
                  />
                </Switch>
              </div>
              <div
                className="col-3 border-left text-center"
                style={{ minHeight: 800 }}
              >
                {user && (
                  <React.Fragment>
                  <NavLink className="text-decoration-none" to="/edit-user">
                    {user.image?.length && <img src={user.image} alt="user img" 
                    className="w-50 rounded-circle mt-5" />
                    }
                      <h6 className="font-italic text-info mt-3">
                        {user?.name}
                        <br />
                        {user?.email}
                      </h6>
                    </NavLink>
                    <div className="mt-3">
                      <NavLink
                        className="btn btn-sm btn-secondary d-inline "
                        to="/edit-user"
                      >
                        Edit User Details
                      </NavLink>
                      <NavLink
                        className="btn btn-sm btn-danger d-inline ml-3"
                        to="/"
                        onClick={async () => {
                          if (window.confirm("Are You Sure?")) {
                            await userService.deleteUser();
                            userService.logout();
                            window.location = "/";
                            toast("Your account has deleted successfully");
                          }
                        }}
                      >
                        Delete Account
                      </NavLink>
                    </div>
                  </React.Fragment>
                )}
               {!user && (
                  <div className="container mt-5">
                    <b className="mt-5">You are not connect</b>
                    <br />
                    Please Sign-Up / Sign-In at the link above to start using the form,
                    including watch question- answers and publish your own posts.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
