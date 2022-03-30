
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";

import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class Signin extends Form {
    state = {
        data: { email: "", password: "" },
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).label("Password")
    }

    doSubmit = async () => {
        const { email, password } = this.state.data;
        try {
            await userService.signin(email.toLowerCase(), password);
            toast("Welcome to M.S. Forums")
            setTimeout(() => {
                window.location = '/';
            }, 1500)
        } catch (ex) {
            if (ex.response?.status === 400) {
                this.setState({ errors: { email: ex.response.data } });
            }
        }
    }

    render() {

        if (userService.getCurrentUser()) return <Redirect to="/" />

        return (
            <div className="container">
                <PageHeader titleText="Signin for M.S. Forums"></PageHeader>
                <div className="row">
                    <div className="col-12">
                        <p>You can Sign In Here to your account</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderButton("Submit")}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
