import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AffiliationLinkTrackingEntity } from 'src/affiliation-links/entities/affiliation-link-tracking.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsNumber, IsOptional, IsEnum, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AccountStatus } from '../entities/user.entity'
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



export class AddRecentSearchesEntityUserEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

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

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isFollowing?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isBlockedBy?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
followersCount?: number| null;
}
