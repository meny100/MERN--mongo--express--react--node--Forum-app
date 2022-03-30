import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import userService from "../services/userService";

class Post extends Component {
  state = {
    data: {
      post: {},
    },
    isFavorite: false,
    numOfLikes: 0
  };

  async componentDidMount() {
    const { post } = this.props;
    let numOfLikes = post.numOfLikes;
    const { data } = await userService.getCurrentUserDetails();
    let isFavorite = data.favorites.find((postId) => postId === post._id);
    this.setState({ data: { post }, isFavorite, numOfLikes });
  }

  render() {
    const {
      state: {
        data: { post },
      },
    } = this;
    const {
      state: { isFavorite },
    } = this;
    const {
      state: { numOfLikes },
    } = this;

    return (
      <div key={post?._id} className="col-10 mt-3">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              <b
                style={{ opacity: "0.7", fontSize: "0.8em" }}
                className="border-bottom"
              >
                Author: {post?.creator}
              </b>
            </p>

            {post?.image && (
              <img
              style={{width: "37.5%"}}
                src={post?.image}
                className="d-block rounded mb-2"
                alt="post img"
              ></img>
            )}
            <p className="card-text">{post?.content}</p>
            <p className="card-text border-top pt-2">
              {!!post?.category?.length && (
                <span style={{ opacity: "0.7", fontSize: "0.8em" }}>
                  Tags:
                  {post?.category?.map((category, index) => (
                    <span
                      className="ml-2 border-bottom border-danger"
                      key={index}
                    >
                      <NavLink
                        onClick={() =>
                          setTimeout(() => {
                            window.location.reload();
                            window.scrollTo(0, 0);
                          }, 0.001)
                        }
                        to={`/category/${category}`}
                      >
                        {category}
                      </NavLink>
                    </span>
                  ))}
                </span>
              )}
              <br />
              <span style={{ opacity: "0.7", fontSize: "0.8em" }}>
                Created at: {post?.createdAt}
              </span>
            </p>
            {!window.location.pathname.includes("/comments") && (
              <Link
                to={`/comments/${post._id}`}
                className="text-info btn btn-sm border"
              >
                <b className="text-danger">{post.comments?.length} </b>
                <i className="far fa-comment"></i> Comments
              </Link>
            )}
            {!isFavorite && (
              <button
                className="ml-3 btn btn-sm border text-success"
                onClick={async () => {
                  this.setState({ isFavorite: true, numOfLikes: numOfLikes + 1 });
                  await userService.addToFav(post?._id);
                }}
              >
                 <b className="text-danger">{numOfLikes} </b>
                <i className="far fa-heart"></i>Add
              </button>
            )}
            {isFavorite && (
              <button
                className="ml-3 btn btn-sm border"
                onClick={async () => {
                  this.setState({ isFavorite: false, numOfLikes: numOfLikes -1 });
                  await userService.removeFromFav(post?._id);

                  //rerender the favorite page if removing card from favs
                  if (window.location.pathname.includes("/favorites"))
                    window.location.reload();
                }}
              >
                <b className="text-danger">{numOfLikes} </b>
                &#10084;
              </button>
            )}
            {window.location.pathname.includes("/my-posts") && (
              <React.Fragment>
                <Link
                  className="ml-3 btn btn-sm btn-secondary"
                  to={`/my-posts/edit/${post?._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="ml-3 btn btn-sm btn-danger"
                  to={`/my-posts/delete/${post?._id}`}
                >
                  Delete
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
