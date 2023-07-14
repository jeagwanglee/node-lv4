const CommentsRepository = require('../repositories/comments.repository');
const PostsRepository = require('../repositories/posts.repository');

class CommentsService {
  commentsRepository = new CommentsRepository();
  postsRepository = new PostsRepository();

  createComment = async (userId, postId, comment, nickname) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      if (!post) {
        throw { errorCode: 404, message: '게시글이 존재하지 않습니다' };
      }

      if (!comment) {
        throw { errorCode: 412, message: '댓글 내용을 입력해주세요.' };
      }

      await this.commentsRepository.createComment(userId, postId, comment, nickname);
    } catch (error) {
      throw { errorCode: 400, message: '댓글 작성에 실패했습니다.' };
    }
  };

  findComments = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!post) throw { errorCode: 404, message: '게시글이 존재하지 않습니다' };

      const comments = await this.commentsRepository.findComments(postId);
      if (!comments) throw { errorCode: 404, message: '댓글이  존재하지 않습니다.' };

      return comments;
    } catch (error) {
      throw { errorCode: 400, message: '댓글 조회에 실패했습니다.' };
    }
  };

  // 댓글 수정 서비스
  updateComment = async (userId, postId, commentId, comment) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      const targetComment = await this.commentsRepository.findOneComment(commentId);

      if (!post) throw { errorCode: 404, message: '게시글이  존재하지 않습니다.' };

      if (!targetComment) throw { errorCode: 404, message: '댓글이 존재하지 않습니다.' };

      if (userId !== targetComment.UserId) {
        throw { errorCode: 403, message: '댓글 수정 권한이 없습니다.' };
      }

      await this.commentsRepository.updateComment(commentId, comment);
    } catch (error) {
      throw { errorCode: 400, message: '댓글 수정에 실패했습니다.' };
    }
  };

  deleteComment = async (userId, postId, commentId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      const targetComment = await this.commentsRepository.findOneComment(commentId);

      if (!post) throw { errorCode: 404, message: '게시글이  존재하지 않습니다.' };

      if (!targetComment) throw { errorCode: 404, message: '댓글이 존재하지 않습니다.' };

      if (userId !== targetComment.UserId) {
        throw { errorCode: 403, message: '댓글 삭제 권한이 없습니다.' };
      }

      await this.commentsRepository.deleteComment(commentId);
    } catch (error) {
      throw { errorCode: 400, message: '댓글 삭제에 실패했습니다.' };
    }
  };
}

module.exports = CommentsService;
