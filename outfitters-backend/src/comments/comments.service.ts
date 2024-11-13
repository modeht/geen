import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { PostEntity } from 'src/posts/entities/post.entity';
import { DataSource, FindOneOptions } from 'typeorm';
import { Paginated } from '../globals/dto/paginated.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
	) {}

	async findAll(postId: number, paginated: Paginated) {
		const [comments, totalCount] = await this.datasource.manager
			.createQueryBuilder(CommentEntity, 'comment')
			.addSelect(
				(sq) =>
					sq
						.select('MAX(descendant.level) ', 'comment_repliesDepth')
						.from(CommentEntity, 'descendant')
						.innerJoin(
							'comments_closure',
							'treeClosure',
							'treeClosure.replyId = descendant.id',
						)
						.where('treeClosure.commentId = comment.id'),
				'comment_repliesDepth',
			)
			.where('comment.postId = :postId', { postId })
			.orderBy('comment.createdAt', 'DESC')
			.skip(paginated.page * paginated.limit)
			.take(paginated.limit)
			.setFindOptions({
				loadEagerRelations: true,
				relationLoadStrategy: 'query',
				relations: ['replies'],
			})
			.getManyAndCount();
		return { comments, totalCount };
	}

	async findReplies(postId: number, id: number, depth: number) {
		const comment = await this.findOne({ where: { id, postId } });

		return this.datasource.manager
			.getTreeRepository(CommentEntity)
			.findDescendantsTree(comment, { relations: ['commentor'], depth: depth });
	}

	async findOne(opts: FindOneOptions<CommentEntity>, throwIfNotFound = true) {
		const comment = await this.datasource.manager.findOne(CommentEntity, opts);
		if (!comment && throwIfNotFound) throw new NotFoundException(`Comment not found`);
		return comment;
	}

	async _saveComment(comment: CommentEntity, postId) {
		const userId = this.authContext.getUser()!.sub;
		comment.userId = userId;
		comment.level = comment.replyTo ? comment.replyTo.level + 1 : 0;

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		try {
			await tr.manager.getTreeRepository(CommentEntity).save(comment);
			await tr.manager.increment(PostEntity, { id: postId }, 'commentsCount', 1);
			await tr.commitTransaction();
			return comment;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	// TODO: notify replied comment, post & story owners
	async createReply(postId: number, id: number, createCommentDto: CreateCommentDto) {
		const comment = await this.findOne({ where: { id } });
		const newComment = new CommentEntity();
		newComment.content = createCommentDto.content;
		newComment.replyTo = comment;
		return this._saveComment(newComment, postId);
	}

	// TODO: notify replied comment, post & story owners
	async create(postId: number, createCommentDto: CreateCommentDto) {
		const newComment = new CommentEntity();
		newComment.content = createCommentDto.content;
		newComment.postId = postId;
		return this._saveComment(newComment, postId);
	}

	async update(id: number, updateCommentDto: UpdateCommentDto) {
		const userId = this.authContext.getUser()!.sub;
		const comment = await this.findOne({ where: { id, userId } });
		await this.datasource.manager.update(
			CommentEntity,
			{ id },
			{ content: updateCommentDto.content },
		);
		return comment;
	}

	async adminRemove(id: number) {
		const comment = await this.findOne({ where: { id } });
		await this.datasource.manager.remove(comment);
		return comment;
	}

	async remove(id: number) {
		const userId = this.authContext.getUser()!.sub;
		const comment = await this.datasource.manager.findOne(CommentEntity, {
			where: { id, userId },
			relations: ['commentor', 'replies', 'post', 'post.postedBy'],
		});
		await this.datasource.manager.remove(comment);
		return comment;
	}
}
