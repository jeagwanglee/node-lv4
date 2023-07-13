const { Posts, Likes } = require('../models');

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

  findLikedPosts = async (userId) => {
    const likedPostsList = await Likes.findAll({ where: { UserId: userId } });

    const likedPosts = likedPostsList.map(async (likedPost) => {
      const PostId = likedPost.PostId;
      const post = await Posts.findOne({
        attributes: ['postId', 'UserId', 'nickname', 'title', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
        where: { postId: PostId },
      });
      const likes = await Likes.findAll({ where: { PostId } });
      post.dataValues.likes = likes.length;
      return post;
    });
    return likedPosts;
  };
}
module.exports = LikesRepository;
