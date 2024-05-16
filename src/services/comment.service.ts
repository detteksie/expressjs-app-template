import { HideCommentRequest, UpdateCommentRequest } from '~/dto/comment.request';
import { Sql, sql } from '~/infrastructures/sql';

export class CommentService {
  constructor(private readonly sql: Sql) {}

  async updateComment(
    commentatorId: number,
    commentId: number,
    updateCommentRequest: UpdateCommentRequest,
  ) {
    const { content } = updateCommentRequest;
    const updatedComment = await this.sql.Comment.update(
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
    const updatedComment = await this.sql.Comment.update(
      { hidden },
      { where: { id: commentId, commentatorId } },
    );
    return updatedComment;
  }

  async deleteComment(commentatorId: number, commentId: number) {
    const deletedComment = await this.sql.Comment.destroy({
      where: { id: commentId, commentatorId },
    });
    return deletedComment;
  }
}

export const commentService = new CommentService(sql);
