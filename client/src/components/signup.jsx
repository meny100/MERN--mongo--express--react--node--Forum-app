import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";

import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import userService from "../services/userService";

class Signup extends Form {
  state = {
    data: { email: "", password: "", name: "", image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    image: Joi.string().min(6).max(2048).required()
  };

  doSubmit = async () => {
    const { data } = this.state;

     data.email = data.email?.toLowerCase();
      await userService.createUserAndLogin(data);
      toast("A New Account was Created");
      setTimeout(() => {
        window.location = "/";
      }, 1500);
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <PageHeader titleText="Signup for M.S. Forums"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p>You can open a new account for free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              encType="multipart/form-data"
              action="/upload"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderInput("image", "Image URL", "img")}
              {this.renderButton("Submit")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
