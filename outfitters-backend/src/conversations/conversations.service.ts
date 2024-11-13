import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { MediaEntity } from '../media/entities/media.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { addIsBlockedByToQuery, addIsFollowingToQuery } from '../users/common-queries';
import { UserEntity } from '../users/entities/user.entity';
import { ConversationType, FindConversationDto } from './dto/find-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationEntity } from './entities/conversation.entity';

@Injectable()
export class ConversationsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async findAll(paginated: Paginated, findConversationDto: FindConversationDto) {
		const userId = this.authContext.getUser()!.sub;

		const archivedOnly =
			findConversationDto.type === ConversationType.ARCHIVED ? true : undefined;
		const collaborationOnly =
			findConversationDto.type === ConversationType.COLLABORATION ? true : undefined;
		const searchOptions: FindOptionsWhere<UserEntity>[] = [
			{
				shopperProfile: [
					{ fullName: ILike(`%${findConversationDto.keyword ?? ''}%`) },
					{ username: ILike(`%${findConversationDto.keyword ?? ''}%`) },
				],
			},
			{
				brandProfile: [
					{ storeName: ILike(`%${findConversationDto.keyword ?? ''}%`) },
					{ brandName: ILike(`%${findConversationDto.keyword ?? ''}%`) },
				],
			},
		];

		const query = this.dataSource.manager
			.createQueryBuilder(ConversationEntity, 'conversation')
			.setFindOptions({
				loadEagerRelations: true,
				where: [
					{
						fromId: userId,
						isCollaboration: collaborationOnly,
						archivedByFrom: archivedOnly,
						to: searchOptions,
					},
					{
						toId: userId,
						isCollaboration: collaborationOnly,
						archivedByTo: archivedOnly,
						from: searchOptions,
					},
				],
			})
			.leftJoinAndSelect('conversation.from', 'from')
			.leftJoinAndSelect('from.brandProfile', 'brand_profiles')
			.leftJoinAndSelect('brand_profiles.logo', 'brand_logo')
			.leftJoinAndSelect('brand_profiles.cover', 'brand_cover')
			.leftJoinAndSelect('from.shopperProfile', 'shopper_profiles')
			.leftJoinAndSelect('shopper_profiles.profilePicture', 'shopper_profile_picture')
			.leftJoinAndSelect('conversation.to', 'to')
			.leftJoinAndSelect('to.brandProfile', 'to_brand_profiles')
			.leftJoinAndSelect('to_brand_profiles.logo', 'to_brand_logo')
			.leftJoinAndSelect('to_brand_profiles.cover', 'to_brand_cover')
			.leftJoinAndSelect('to.shopperProfile', 'to_shopper_profiles')
			.leftJoinAndSelect(
				'to_shopper_profiles.profilePicture',
				'to_shopper_profile_picture',
			)

			.leftJoinAndMapOne(
				'conversation.lastMessage',
				MessageEntity,
				'messages',
				'conversation.id = messages.conversationId AND messages.id = (SELECT MAX(m.id) FROM messages m WHERE m."conversationId" = conversation.id)',
			)
			.leftJoinAndSelect('messages.collaboration', 'collaboration')
			.leftJoinAndSelect('collaboration.products', 'products')
			.leftJoinAndMapOne(
				'products.media',
				MediaEntity,
				'media',
				'media."productId"=products.id',
			);
		addIsFollowingToQuery(userId, 'from', query);
		addIsFollowingToQuery(userId, 'to', query);
		addIsBlockedByToQuery(userId, 'from', query);
		addIsBlockedByToQuery(userId, 'to', query);

		const [conversations, totalCount] = await query
			.orderBy('conversation.updatedAt', 'DESC')
			.take(+paginated.limit)
			.skip(+paginated.page * +paginated.limit)
			.getManyAndCount();
		return { conversations, totalCount };
	}

	async update(id: number, updateConversationDto: UpdateConversationDto) {
		const userId = this.authContext.getUser()!.sub;

		const conversation = await this.dataSource.manager.findOne(ConversationEntity, {
			where: { id },
		});

		if (conversation.fromId === userId) {
			conversation.archivedByFrom = updateConversationDto.isArchived;
		} else if (conversation.toId === userId) {
			conversation.archivedByTo = updateConversationDto.isArchived;
		} else {
			throw new ForbiddenException('You are not allowed to update this conversation');
		}

		return this.dataSource.manager.save(conversation);
	}
}
