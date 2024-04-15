import { db } from '~/models';
import { HideCommentRequest, UpdateCommentRequest } from '~/dto/comment.request';

export class CommentService {
  constructor(private readonly database: typeof db) {}

  async updateComment(
    commentatorId: number,
    commentId: number,
    updateCommentRequest: UpdateCommentRequest,
  ) {
    const { content } = updateCommentRequest;
    const updatedComment = await this.database.Comment.update(
      { content },
      { where: { id: commentId, commentatorId } },
    );
    return updatedComment;
  }

  async hideComment(
    commentatorId: number,
    commentId: number,
    updateCommentRequest: HideCommentRequest,
  ) {
    const { hidden } = updateCommentRequest;
    const updatedComment = await this.database.Comment.update(
      { hidden },
      { where: { id: commentId, commentatorId } },
    );
    return updatedComment;
  }

  async deleteComment(commentatorId: number, commentId: number) {
    const deletedComment = await this.database.Comment.destroy({
      where: { id: commentId, commentatorId },
    });
    return deletedComment;
  }
}

export const commentService = new CommentService(db);
