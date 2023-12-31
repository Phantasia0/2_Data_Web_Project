import { Post, Comment } from "../db/models/Post";

class postService {
  static async getSpecificUserPosts({ page, _id }) {
    if (!page) page = 1;
    return await Post.findAll({ page, _id });
  }

  static async getSpecificUserComments({ page, _id }) {
    if (!page) page = 1;
    return await Comment.findAll({ page, _id });
  }

  static async getPosts(page, userId) {
    if (!page) page = 1;
    return await Post.findAll(page, userId);
  }

  static async getSearchedPosts({ page, nickname, userId }) {
    if (!page) page = 1;
    return await Post.findAllBySearch({ page, nickname, userId });
  }

  static async getPost(_id, userId) {
    return await Post.findById(_id, userId);
  }

  static async create({ user, content, restaurant, park }) {
    return await Post.create({ user, content, restaurant, park });
  }

  static async update({ _id, content }) {
    return await Post.update({ _id, content });
  }

  static async remove(_id) {
    return await Post.remove(_id);
  }

  static async updateLike({ postId, userId }) {
    return await Post.postLike({ postId, userId });
  }

  static async createComment({ postId, userId, content }) {
    return await Comment.create({ _id: postId, user: userId, content });
  }

  static async updateComment({ _id, content }) {
    return await Comment.update({ _id, content });
  }

  static async removeComment(_id) {
    return await Comment.remove(_id);
  }
}

export { postService };
