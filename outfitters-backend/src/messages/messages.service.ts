import {
	forwardRef,
	Inject,
	Injectable,
	MethodNotAllowedException,
	NotFoundException,
} from '@nestjs/common';
import { ConversationEntity } from 'src/conversations/entities/conversation.entity';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { MediaEntity } from 'src/media/entities/media.entity';
import { DataSource, ILike, IsNull, QueryRunner } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessagesDto } from './dto/find-messages.dto';
import { MessageEntity } from './entities/message.entity';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
	constructor(
		private readonly dataSource: DataSource,
		@Inject(forwardRef(() => MessagesGateway))
		private readonly messagesGateway: MessagesGateway,
	) {}

	async create(senderId: number, createMessageDto: CreateMessageDto, tr?: QueryRunner) {
		// TODO: check if user is allowed to send message to recipient
		const receipeintId = createMessageDto.recipientId ?? null;
		let conversation: ConversationEntity;

		if (receipeintId) {
			await this._isAllowedCheck(senderId, receipeintId);
			conversation = await this.dataSource.manager.findOne(ConversationEntity, {
				select: ['id', 'fromId', 'toId', 'archivedByFrom', 'archivedByTo'],
				where: [
					{ fromId: senderId, toId: receipeintId },
					{ fromId: receipeintId, toId: senderId },
				],
			});
		} else {
			conversation = await this.dataSource.manager.findOne(ConversationEntity, {
				select: ['id', 'fromId', 'toId', 'archivedByFrom', 'archivedByTo'],
				where: [
					{ fromId: senderId, toId: IsNull() },
					{ fromId: IsNull(), toId: senderId },
				],
			});
		}

		if (!conversation) {
			conversation = new ConversationEntity();
			conversation.fromId = senderId;
			conversation.toId = receipeintId;
			conversation.isSupport = receipeintId == null;
			conversation.isCollaboration = createMessageDto.collaboration ? true : false;
		}

		const newMessage = new MessageEntity();
		newMessage.content = createMessageDto.content;
		newMessage.conversation = conversation;
		newMessage.fromId = senderId;
		newMessage.toId = receipeintId;
		newMessage.conversation.updatedAt = new Date();
		newMessage.collaboration = createMessageDto.collaboration;
		newMessage.postId = createMessageDto.postId;
		newMessage.storyId = createMessageDto.storyId;
		newMessage.commentId = createMessageDto.commentId;
		newMessage.productId = createMessageDto.productId;
		newMessage.media = createMessageDto.mediaIds?.map((id) => ({
			id,
		})) as MediaEntity[];

		let message: MessageEntity;
		if (tr) message = await tr.manager.save(newMessage);
		else message = await this.dataSource.manager.save(newMessage);

		const isArchivedByRecipient =
			(conversation.fromId === receipeintId && conversation.archivedByFrom) ||
			(conversation.toId === receipeintId && conversation.archivedByTo);

		if (!isArchivedByRecipient) this.messagesGateway.sendMessage(receipeintId, message);

		return message;
	}

	private async _isAllowedCheck(senderId, receipeintId) {
		const isBlocked = await this.dataSource.manager.exists('user_blocks', {
			where: [
				{ blockerId: senderId, blockedId: receipeintId },
				{ blockerId: receipeintId, blockedId: senderId },
			],
		});
		if (isBlocked) throw new MethodNotAllowedException('User is blocked');
	}

	async findAll(userId: number, findMessagesDto: FindMessagesDto, paginated: Paginated) {
		const { conversationId, keyword } = findMessagesDto;
		const [messages, totalCount] = await this.dataSource.manager.findAndCount(
			MessageEntity,
			{
				order: { createdAt: 'DESC' },
				take: +paginated.limit,
				skip: +paginated.limit * +paginated.page,
				where: [
					{
						conversationId: conversationId,
						fromId: userId,
						content: ILike(`%${keyword ?? ''}%`),
					},
					{
						conversationId: conversationId,
						toId: userId,
						content: ILike(`%${keyword ?? ''}%`),
					},
				],
				relations: ['media', 'collaboration'],
			},
		);
		return { messages, totalCount };
	}

	async findRecepientMessages(userId: number, messageId: number) {
		const message = await this.dataSource.manager.findOne(MessageEntity, {
			where: { id: messageId, toId: userId },
		});
		if (!message)
			throw new NotFoundException(
				`Message with id ${messageId} not found for user with id ${userId} as recipient`,
			);

		return message;
	}

	async readMessage(userId: number, messageId: number) {
		const message = await this.findRecepientMessages(userId, messageId);
		const now = new Date();
		if (!message.readAt) {
			await this.dataSource.manager.update(MessageEntity, message.id, {
				readAt: now,
			});
		}
		message.readAt = now;
		return message;
	}

	async reactToMessage(userId: number, messageId: number, reaction: string) {
		const message = await this.findRecepientMessages(userId, messageId);
		if (message.reaction === reaction) return message;
		message.reaction = reaction;
		await this.dataSource.manager.update(MessageEntity, message.id, {
			reaction,
		});
		const otherUserId = message.fromId === userId ? message.toId : message.fromId;
		this.messagesGateway.sendReaction(otherUserId, message);

		return message;
	}
}
