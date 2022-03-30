import { Component } from "react";
import PageHeader from "./common/pageHeader";
import Post from "./post";
import userService from "../services/userService";
import { Link } from "react-router-dom";

class Favorites extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data } = await userService.getFavorites();

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
          <PageHeader titleText="Your Favorites Posts" />
        </div>
        <div className="row">
          {!!posts.length &&
            posts.map((post) => <Post key={post._id} post={post} />)}
          {!posts.length && (
            <div className="row">
              <div className="col-12">
                <p>There no favorites cards yet.</p>
                <Link to="/category/all-categories">
                  Click here to All-posts
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
