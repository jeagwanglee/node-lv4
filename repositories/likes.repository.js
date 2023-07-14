const { Users, Posts, Likes } = require('../models');
const sequelize = require('sequelize');

class LikesRepository {
  findOneLike = async (UserId, PostId) => {
    const like = await Likes.findOne({ where: { UserId, PostId } });
    return like;
  };

  createLike = async (UserId, PostId) => {
    await Likes.create({ UserId, PostId });
  };
  deleteLike = async (UserId, PostId) => {
    await Likes.destroy({ where: { UserId, PostId } });
  };

  findAllLikesById = async (Id) => {
    const likes = await Likes.findAll({ where: { Id } });
  };

  findLikedPosts = async (UserId) => {
    const posts = await Likes.findAll({
      where: { UserId },
      attributes: ['PostId'],
      include: [
        {
          model: Posts,
          attributes: [
            'UserId',
            'nickname',
            'title',
            'createdAt',
            'updatedAt',
            [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Post.postId)'), 'likes'],
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  };
}
module.exports = LikesRepository;
