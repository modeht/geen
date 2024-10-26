import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AffiliationLinkTrackingEntity } from 'src/affiliation-links/entities/affiliation-link-tracking.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsEnum, IsString, IsOptional, IsBoolean, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AccountStatus } from '../entities/user.entity'
import { AddUserEntityShopperProfileEntityDto } from '../generated-dtos/add-user-entity-shopper-profile-entity.dto';
import { AddUserEntityBrandProfileEntityDto } from '../generated-dtos/add-user-entity-brand-profile-entity.dto';
import { AddUserEntityCommentEntityDto } from '../../comments/generated-dtos/add-user-entity-comment-entity.dto';
import { AddUserEntityAffiliationLinkTrackingEntityDto } from '../../affiliation-links/generated-dtos/add-user-entity-affiliation-link-tracking-entity.dto';
import { AddUserEntityNotificationEntityDto } from '../../notifications/generated-dtos/add-user-entity-notification-entity.dto';
import { AddUserEntityConversationEntityDto } from '../../conversations/generated-dtos/add-user-entity-conversation-entity.dto';
import { AddUserEntityMessageEntityDto } from '../../messages/generated-dtos/add-user-entity-message-entity.dto';
import { AddUserEntityPostEntityDto } from '../../posts/generated-dtos/add-user-entity-post-entity.dto';
import { AddUserEntityStoryEntityDto } from '../../stories/generated-dtos/add-user-entity-story-entity.dto';
import { AddUserEntitySavedCollectionEntityDto } from '../../saved-collections/generated-dtos/add-user-entity-saved-collection-entity.dto';
import { AddUserEntityRecentSearchesEntityDto } from '../../search/generated-dtos/add-user-entity-recent-searches-entity.dto';
import { AddUserEntityPostLikesEntityDto } from '../../posts/generated-dtos/add-user-entity-post-likes-entity.dto';
import { AddUserEntityStoryLikesEntityDto } from '../../stories/generated-dtos/add-user-entity-story-likes-entity.dto';
import { AddUserEntityUserEntityDto } from '../generated-dtos/add-user-entity-user-entity.dto';
import { LanguageEnum } from '../../../lib/enums'
import { Role } from '../../auth/types'
import { ConversationEntity } from '../../conversations/entities/conversation.entity'
import { DEFAULT_LANG } from '../../globals/constants'
import { MessageEntity } from '../../messages/entities/message.entity'
import { PostLikesEntity } from '../../posts/entities/posts-likes.entity'
import { SavedCollectionEntity } from '../../saved-collections/entities/saved-collection.entity'
import { RecentSearchesEntity } from '../../search/entities/recent-searches.entity'
import { BrandProfileEntity } from '../entities/brand-profile.entity'
import { ShopperProfileEntity } from '../entities/shopper-profile.entity'
import { StoryLikesEntity } from '../../stories/entities/stories-likes.entity'



export class AddUserEntityDto {
@IsEnum(AccountStatus)
status: AccountStatus;

@IsString()
@IsOptional()
email?: string | null;

@IsString()
@IsOptional()
phone?: string | null;

@IsString()
@IsOptional()
password?: string | null;

@IsString()
@IsOptional()
firebaseId?: string | null;

@IsBoolean()
@IsOptional()
emailVerified?: boolean | null;

@IsBoolean()
@IsOptional()
isGoogleSignin?: boolean | null;

@IsBoolean()
@IsOptional()
isAppleSignin?: boolean | null;

@IsEnum(LanguageEnum)
defaultLang: LanguageEnum;

@IsOptional()
@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddUserEntityShopperProfileEntityDto)
shopperProfile?: AddUserEntityShopperProfileEntityDto | null;

@IsOptional()
@IsOptional()
@Relation({entity:'BrandProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddUserEntityBrandProfileEntityDto)
brandProfile?: AddUserEntityBrandProfileEntityDto | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CommentEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityCommentEntityDto)
comments?: AddUserEntityCommentEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'AffiliationLinkTrackingEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityAffiliationLinkTrackingEntityDto)
affiliationLinkTracking?: AddUserEntityAffiliationLinkTrackingEntityDto[] | null;

@IsOptional()
@Relation({entity:'NotificationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityNotificationEntityDto)
notifications?: AddUserEntityNotificationEntityDto[]| null;

@IsOptional()
@IsOptional()
@Relation({entity:'ConversationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityConversationEntityDto)
initiatedConversations?: AddUserEntityConversationEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'ConversationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityConversationEntityDto)
receivedConversations?: AddUserEntityConversationEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityMessageEntityDto)
sentMessages?: AddUserEntityMessageEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityMessageEntityDto)
receivedMessages?: AddUserEntityMessageEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'PostEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityPostEntityDto)
posts?: AddUserEntityPostEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'StoryEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityStoryEntityDto)
stories?: AddUserEntityStoryEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'SavedCollectionEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntitySavedCollectionEntityDto)
savedCollections?: AddUserEntitySavedCollectionEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'RecentSearchesEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddUserEntityRecentSearchesEntityDto)
recentSearches?: AddUserEntityRecentSearchesEntityDto[] | null;

@IsOptional()
@Relation({entity:'PostLikesEntity',type:'hasMany'})
@ValidateNested()
@Type(() => AddUserEntityPostLikesEntityDto)
likedPosts?: AddUserEntityPostLikesEntityDto| null;

@IsOptional()
@Relation({entity:'StoryLikesEntity',type:'hasMany'})
@ValidateNested()
@Type(() => AddUserEntityStoryLikesEntityDto)
likedStories?: AddUserEntityStoryLikesEntityDto| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityPostEntityDto)
taggedInPosts?: AddUserEntityPostEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityStoryEntityDto)
taggedInStories?: AddUserEntityStoryEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityUserEntityDto)
following?: AddUserEntityUserEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityUserEntityDto)
follows?: AddUserEntityUserEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityUserEntityDto)
blockedBy?: AddUserEntityUserEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddUserEntityUserEntityDto)
blockedUsers?: AddUserEntityUserEntityDto[] | null;

@IsBoolean()
isFollowing: boolean;

@IsBoolean()
isBlockedBy: boolean;

@IsNumber()
followersCount: number;

@IsOptional()
role?: Role | null;
}
