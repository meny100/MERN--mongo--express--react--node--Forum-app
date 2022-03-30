import postService from "../services/postService";
import { toast } from "react-toastify";
import { Component } from "react";

class DeletePost extends Component {
  state = {};

  async componentDidMount() {
    if(window.confirm("Are You Sure?")){
      const postId = this.props.match.params.id;
      await postService.deletePost(postId);
      toast("The post was deleted successfully");
    }
    this.props.history.replace("/my-posts");
  }

  render = () => null;
}
export default DeletePost;
