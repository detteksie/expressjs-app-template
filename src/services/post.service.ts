import createHttpError from 'http-errors';
import {
  AddPostCommentRequest,
  CreatePostRequest,
  PublishPostRequest,
  UpdatePostRequest,
} from '~/dto/post.request';
import { Sql, sql } from '~/infrastructures/sql';

export class PostService {
  constructor(private readonly sql: Sql) {}

  async createPost(authorId: number, createPostRequest: CreatePostRequest) {
    const { title, content } = createPostRequest;
    const newPost = await this.sql.Post.create({ authorId, title, content });
    return newPost;
  }

  async getPostList() {
    const posts = await this.sql.Post.findAll({ where: { isPublished: true } });
    return posts;
  }

  async getPost(postId: number) {
    const post = await this.sql.Post.findByPk(postId, {
      include: [
        {
          model: this.sql.User,
          as: 'author',
        },
      ],
    });
    if (!post?.isPublished) throw createHttpError(404, 'Post not found');
    return post;
  }

  async updatePost(authorId: number, postId: number, updatePostRequest: UpdatePostRequest) {
    const { title, content } = updatePostRequest;
    const updatedPost = await this.sql.Post.update(
      { title, content },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async publishPost(authorId: number, postId: number, publishPostRequest: PublishPostRequest) {
    const { isPublished } = publishPostRequest;
    const updatedPost = await this.sql.Post.update(
      { isPublished },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async deletePost(authorId: number, postId: number) {
    const deletedPost = await this.sql.Post.destroy({ where: { id: postId, authorId } });
    return deletedPost;
  }

  async addPostComment(
    commentatorId: number,
    postId: number,
    addPostCommentRequest: AddPostCommentRequest,
  ) {
    const { content } = addPostCommentRequest;
    const addedComment = await this.sql.Comment.create({ commentatorId, postId, content });
    return addedComment;
  }

  async getPostComments(postId: number) {
    const postComments = await this.sql.Comment.findAll({
      where: { postId, hidden: false },
      include: [
        {
          model: this.sql.User,
          attributes: ['name'],
        },
      ],
    });
    return postComments;
  }
}

export const postService = new PostService(sql);
