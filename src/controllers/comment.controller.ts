import expressAsyncHandler from 'express-async-handler';
import { HideCommentRequest, UpdateCommentRequest } from '~/dto/comment.request';
import { CommentService, commentService } from '~/services/comment.service';

type CommentControllerId = {
  commentId: string;
};

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  updateComment = expressAsyncHandler<CommentControllerId, any, UpdateCommentRequest>(
    async (req, res) => {
      await this.commentService.updateComment(
        req.user?.id!,
        parseInt(req.params.commentId),
        req.body,
      );
      res.status(204).json();
    },
  );

  hideComment = expressAsyncHandler<CommentControllerId, any, HideCommentRequest>(
    async (req, res) => {
      await this.commentService.hideComment(
        req.user?.id!,
        parseInt(req.params.commentId),
        req.body,
      );
      res.status(204).json();
    },
  );

  deleteComment = expressAsyncHandler<CommentControllerId>(async (req, res) => {
    await this.commentService.deleteComment(req.user?.id!, parseInt(req.params.commentId));
    res.status(204).json();
  });
}

export const commentController = new CommentController(commentService);
