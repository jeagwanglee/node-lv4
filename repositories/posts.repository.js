const { Posts, Likes } = require('../models');

class PostsRepository {
  createPost = async (UserId, nickname, title, content) => {
    await Posts.create({ UserId, nickname, title, content });
  };

  findAllPosts = async () => {
    const posts = await Posts.findAll({
      attributes: ['postId', 'UserId', 'nickname', 'title', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });

    const result = posts.map(async (post) => {
      const likes = await Likes.findAll({ where: { PostId: post.postId } });
      post.dataValues.likes = likes.length;
      return post;
    });

    return result;
  };

  getOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });

    const likes = await Likes.findAll({ where: { PostId: postId } });
    post.dataValues.likes = likes.length;
    return post;
  };

  updatePost = async (title, content, postId) => {
    await Posts.update({ title, content }, { where: { postId } });
  };
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostsRepository;
