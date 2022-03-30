import Joi from "joi-browser";
import React from "react/cjs/react.production.min";
import postService from "../services/postService";
import Form from "./common/form";
import Post from "./post";

class Comments extends Form {
  state = {
    data: {
      comment: "",
    },
    post: {},
    comments: [],
    errors: {},
  };

  async componentDidMount() {
    let postId = this.props.match.params.id;
    window.scrollTo(0, 0);
    let { data } = await postService.getPost(postId);
    let comments = data?.comments?.reverse();
    this.setState({ post: data, comments });
  }

  schema = {
    comment: Joi.string().required().min(2),
  };

  doSubmit = async () => {
    const {
      state: {
        data: { comment },
      },
    } = this;
    let postId = this.props.match.params.id;
    await postService.publishComment({ comment, postId });
    window.location.reload();
  };

  render() {
    const {
      state: { post },
    } = this;
    const {
      state: { comments },
    } = this;
    return (
      <React.Fragment>
        <div className="container">
          <button
            className="btn btn-danger mt-2"
            onClick={() => this.props.history.goBack()}
          >
            X
          </button>
          <div className="row">
            <Post key={post?._id} post={post} />
          </div>
          <div className="row">
            <div className="col-10">
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                method="POST"
              >
                <div className="row">
                 <div className="d-inline col-9">
                {this.renderInput("comment", "", "text")}
                  </div>
                <div className="d-inline col-3 mt-4">
                  {this.renderButton("+Add Comment")}
                </div>
                </div>
              </form>
            </div>
          </div>
          <h4 className="my-3">Comments</h4>
          <div className="row mt-4">
            {!!comments?.length &&
              comments.map((comment, index) => (
                <div className="col-10 mt-1" key={index}>
                  <b style={{ fontSize: "0.7em", opacity: "0.4" }}>
                    {comment?.publisher} - {comment?.time}
                  </b>
                  <p>{comment?.content}</p>
                  <p role="separator" className="dropdown-divider"></p>
                </div>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;
