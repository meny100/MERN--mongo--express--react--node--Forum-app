import http from "./httpService";
import { apiUrl } from "../config.json";

async function createPost(post) {
        return await http.post(`${apiUrl}/posts`, post);
    }

async function getByCategory(category){
    return await http.get(`${apiUrl}/posts/${category}`)
}

async function getPost(id){
    return await http.get(`${apiUrl}/posts/by_id/${id}`)
}

async function getMyPosts(){
    return await http.get(`${apiUrl}/posts/my-posts`)
}

async function publishComment(comment){
    return await http.post(`${apiUrl}/posts/publish-comment`, comment)
}

async function deletePost(postId){
    return await http.delete(`${apiUrl}/posts/${postId}`)
}

async function editPost(postId, post){
    return await http.put(`${apiUrl}/posts/${postId}`, post)
}


const exportedObject = {
    createPost,
    getByCategory,
    getPost,
    publishComment,
    getMyPosts,
    deletePost,
    editPost,
}

export default exportedObject;