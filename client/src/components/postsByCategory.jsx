import { React, Component } from "react";
import postService from "../services/postService";
import PageHeader from "./common/pageHeader";
import Post from "./post";

class PostsByCategory extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const chosenCategory = this.props.match.params.id;
    const { data } = await postService.getByCategory(chosenCategory);
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

    const chosenCategory = this.props.match.params.id;
    return (
      <div className="container">
        {!!posts.length && (
          <div className="row">
            <div className="col-12 mb-4">
              <PageHeader titleText={`All posts about ${chosenCategory}`} />
            </div>          
            <div className="col-12">
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>
          </div>
        )}
        {!posts?.length && (
          <div className="row">
            <div className="col-12 mb-4">
              <PageHeader
                titleText={`There no posts about '${chosenCategory}' yet...`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PostsByCategory;
