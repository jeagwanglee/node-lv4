const CommentsRepository = require('../repositories/comments.repository');
const PostsRepository = require('../repositories/posts.repository');

class CommentsService {
  commentsRepository = new CommentsRepository();
  postsRepository = new PostsRepository();

  createComment = async (userId, postId, comment, nickname) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }

      if (!comment) {
        return { status: 412, data: { errorMessage: '댓글 내용을 입력해주세요.' } };
      }

      await this.commentsRepository.createComment(userId, postId, comment, nickname);
      return { status: 201, data: { message: '댓글을 작성하였습니다.' } };
    } catch (error) {
      return { status: 400, data: { errorMessage: '댓글 작성에 실패했습니다.' } };
    }
  };

  findComments = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }

      const comments = await this.commentsRepository.findComments(postId);

      return { status: 200, data: { comments } };
    } catch (error) {
      return { status: 400, data: { errorMessage: '댓글 조회에 실패했습니다.' } };
    }
  };

  // 댓글 수정 서비스
  updateComment = async (userId, postId, commentId, comment) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      const targetComment = await this.commentsRepository.findOneComment(commentId);

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }

      if (!targetComment) {
        return { status: 404, data: { errorMessage: '댓글 조회에 실패하였습니다.' } };
      }

      if (userId !== targetComment.UserId) {
        return { status: 403, data: { errorMessage: '댓글 수정 권한이 없습니다.' } };
      }

      await this.commentsRepository.updateComment(commentId, comment);
      return { status: 200, data: { message: '댓글을 수정하였습니다.' } };
    } catch (error) {
      return { status: 400, data: { errorMessage: '댓글 수정에 실패했습니다.' } };
    }
  };

  deleteComment = async (userId, postId, commentId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      const targetComment = await this.commentsRepository.findOneComment(commentId);

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }

      if (!targetComment) {
        return { status: 404, data: { errorMessage: '댓글 조회에 실패하였습니다.' } };
      }

      if (userId !== targetComment.UserId) {
        return { status: 403, data: { errorMessage: '댓글 삭제 권한이 없습니다.' } };
      }

      await this.commentsRepository.deleteComment(commentId);
      return { status: 200, data: { message: '댓글을 삭제하였습니다.' } };
    } catch (error) {
      return { status: 400, data: { errorMessage: '댓글 삭제에 실패했습니다.' } };
    }
  };
}

module.exports = CommentsService;
