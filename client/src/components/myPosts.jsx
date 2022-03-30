import { Component } from "react";
import { Link } from "react-router-dom";
import postService from "../services/postService";
import PageHeader from "./common/pageHeader";
import Post from "./post";

class MyPosts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data } = await postService.getMyPosts();
    if (data.length) {
      this.setState({
        posts: data.reverse()
      });
    }
  }

  render() {
    const {
      state: { posts },
    } = this;

    return (
      <div className="container">
        <div className="col-12 mb-4">
          <PageHeader titleText="My Posts" />
        </div>
        <div className="row">
          {!!posts.length &&
            posts.map((post) => <Post key={post._id} post={post} />)}
          {!posts.length && (
            <div className="col-12 my-4">
              <p>You have not publish a post yet.</p>
              <Link className="btn btn-primary" to="/create-post">
                Add a New one
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyPosts;
