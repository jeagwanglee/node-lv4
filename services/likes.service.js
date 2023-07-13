const LikesRepository = require('../repositories/likes.repository');
const PostsRepository = require('../repositories/posts.repository');

class LikesService {
  likesRepository = new LikesRepository();
  postsRepository = new PostsRepository();

  postLike = async (UserId, PostId) => {
    try {
      const post = await this.postsRepository.getOnePost(PostId);
      const like = await this.likesRepository.findOneLike(UserId, PostId);

      if (!post) {
        return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }

      if (like) {
        // 좋아요 데이터를 삭제
        await this.likesRepository.deleteLike(UserId, PostId);
        return { status: 200, data: { message: '게시글의 좋아요를 취소하였습니다.' } };
      }
      // 좋아요 데이터를 생성
      await this.likesRepository.createLike(UserId, PostId);
      return { status: 200, data: { message: '게시글의 좋아요를 등록하였습니다.' } };
    } catch (error) {
      throw new Error('게시글 좋아요에 실패하였습니다.');
    }
  };

  getLikedPosts = async (userId) => {
    try {
      const likedPosts = await this.likesRepository.findLikedPosts(userId);

      const resolvedPosts = await Promise.all(likedPosts);
      // 게시글을 좋아요 개수가 많은 순으로 정렬
      resolvedPosts.sort((a, b) => {
        return b.dataValues.likes - a.dataValues.likes;
      });
      return resolvedPosts;
    } catch (error) {
      throw new Error('좋아요 게시글 조회에 실패했습니다.');
    }
  };
}
module.exports = LikesService;
