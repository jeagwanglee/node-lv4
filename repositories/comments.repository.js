const { Posts, Comments } = require('../models');

class CommentsRepository {
  createComment = async (userId, postId, comment, nickname) => {
    await Comments.create({ UserId: userId, PostId: postId, comment, nickname });
  };
  findComments = async (postId) => {
    const comments = await Comments.findAll({ where: { PostId: postId }, order: [['createdAt', 'DESC']] });
    return comments;
  };

  findOneComment = async (commentId) => {
    const comment = await Comments.findOne({ where: { commentId } });
    return comment;
  };

  updateComment = async (commentId, comment) => {
    await Comments.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentsRepository;
