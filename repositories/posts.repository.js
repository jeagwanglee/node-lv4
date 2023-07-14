const { Posts, Likes } = require('../models');
const sequelize = require('sequelize');

class PostsRepository {
  createPost = async (UserId, nickname, title, content) => {
    await Posts.create({ UserId, nickname, title, content });
  };

  findAllPosts = async () => {
    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'UserId',
        'nickname',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.postId = Posts.postId)'), 'likes'],
      ],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  };

  getOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
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
