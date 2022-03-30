import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import postService from "../services/postService";
import { toast } from "react-toastify";
import categories from "../assets/categories";

class EditPost extends Form {
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
    image: Joi.string().max(2048).optional()
  };

  async componentDidMount() {
    const postId = this.props.match.params.id;
    const { data } = await postService.getPost(postId);
    this.setState({
      data: {
        content: data.content,
        category: [],
        image: data?.image
      }
    });
  }

  doSubmit = async () => {
    const {
      state: { data },
    } = this;
    const postId = this.props.match.params.id;

    await postService.editPost(postId, data);
    toast("post Is Updated");
    this.props.history.replace("/my-posts");
  };
  handleCancel = () => {
    this.props.history.push("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit Form"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p className="mb-5">Edit Your Post</p>
          </div>
        </div>
        <div className="row">
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
              {this.renderInput("content", "Edit content", "text-area")}
              {this.renderInput("image", "Image URL (optional)", "img")}
              {this.renderButton("Update")}
              <button
                className="btn btn-secondary ml-2"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
