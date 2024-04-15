import createHttpError from 'http-errors';
import { db } from '~/models';
import {
  AddPostCommentRequest,
  CreatePostRequest,
  PublishPostRequest,
  UpdatePostRequest,
} from '~/dto/post.request';

export class PostService {
  constructor(private readonly database: typeof db) {}

  async createPost(authorId: number, createPostRequest: CreatePostRequest) {
    const { title, content } = createPostRequest;
    const newPost = await this.database.Post.create({ authorId, title, content });
    return newPost;
  }

  async getPostList() {
    const posts = await this.database.Post.findAll({ where: { isPublished: true } });
    return posts;
  }

  async getPost(postId: number) {
    const post = await this.database.Post.findByPk(postId, {
      include: [
        {
          model: this.database.User,
          as: 'author',
        },
      ],
    });
    if (!post?.isPublished) throw createHttpError(404, 'Post not found');
    return post;
  }

  async updatePost(authorId: number, postId: number, updatePostRequest: UpdatePostRequest) {
    const { title, content } = updatePostRequest;
    const updatedPost = await this.database.Post.update(
      { title, content },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async publishPost(authorId: number, postId: number, publishPostRequest: PublishPostRequest) {
    const { isPublished } = publishPostRequest;
    const updatedPost = await this.database.Post.update(
      { isPublished },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async deletePost(authorId: number, postId: number) {
    const deletedPost = await this.database.Post.destroy({ where: { id: postId, authorId } });
    return deletedPost;
  }

  async addPostComment(
    commentatorId: number,
    postId: number,
    addPostCommentRequest: AddPostCommentRequest,
  ) {
    const { content } = addPostCommentRequest;
    const addedComment = await this.database.Comment.create({ commentatorId, postId, content });
    return addedComment;
  }

  async getPostComments(postId: number) {
    const postComments = await this.database.Comment.findAll({
      where: { postId, hidden: false },
      include: [
        {
          model: this.database.User,
          attributes: ['name'],
        },
      ],
    });
    return postComments;
  }
}

export const postService = new PostService(db);
