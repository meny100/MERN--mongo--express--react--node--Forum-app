import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import postService from "../services/postService";
import categories from "../assets/categories";
import { toast } from "react-toastify";

class CreatePost extends Form {
  state = {
    data: {
      category: [],
      content: "",
    },
    errors: {},
  };

  schema = {
    category: Joi.array(),
    content: Joi.string().min(2).max(16384).required(),
    image: Joi.string().max(2048).optional().allow("")
  };

  doSubmit = async () => {
    const {
      state: { data },
    } = this;

    await postService.createPost(data);
    toast("A new Post is Published");
    this.props.history.replace("/category/all-categories");
    window.scrollTo(0,0);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Write your Post/Question" />
        <div className="row mt-3">
          <div className="col-lg-11">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              <div className="row">
                <h4 className="col-12 my-3">Categories</h4>
                  {categories.map((category) =>
                    <div className="col-3">
                     {this.renderCheckBoxInput(`${category}`)}
                     </div>
                  )}
                  </div>
              {this.renderInput("content", "Your Question", "text-area")}
              {this.renderInput("image", "Image URL (optional)", "img")}
              {this.renderButton("Post")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
