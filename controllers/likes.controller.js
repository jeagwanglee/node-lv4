const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  postLike = async (req, res) => {
    const { userId: UserId } = res.locals.user;
    const { postId: PostId } = req.params;

    try {
      const { status, data } = await this.likesService.postLike(UserId, PostId);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  getLikedPosts = async (req, res) => {
    const { userId } = res.locals.user;
    try {
      const likedPosts = await this.likesService.getLikedPosts(userId);
      res.status(200).json({ posts: likedPosts });
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
}

module.exports = LikesController;
