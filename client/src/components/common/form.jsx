import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMesage = this.validateProperty(input);
    if (errorMesage) errors[input.name] = errorMesage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text", ...rest) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        value={data[name]}
        name={name}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
  handleCheckBoxChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    //check if the input.value in the array 
    let index = data[input.name]?.findIndex(item => item === input.value)
    if(index === -1) {
      data[input.name]?.push(input.value);
    }else{
      data[input.name]?.splice(index, 1)
    }
    
    this.setState({ data });
  };

  renderCheckBoxInput(specificCategory, ...rest) {
    return (
      <Input
      name={"category"}
        type="checkbox"
        label={`${specificCategory}`}
        value= {specificCategory.toLowerCase()}
        key={specificCategory}
        className="col-2"
        onChange={this.handleCheckBoxChange}
        {...rest}
      />
    );
  }
}

export default Form;
