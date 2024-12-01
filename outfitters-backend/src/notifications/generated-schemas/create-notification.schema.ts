import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { NotificationType } from '../entities/notification.entity'
import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
import { CollaborationStatusEnum } from '../../collaborations/entities/collaboration.entity'
import { PromotionTypeEnum } from '../../promotions/entities/enums'
import { PromotionTargetEnum } from '../../promotions/entities/enums'
import { PromotionStatusEnum } from '../../promotions/entities/enums'
export const CreateNotificationSchema = v.pipe(v.object({type: v.enum(NotificationType),
customContent: v.string(),
isRead: v.boolean(),
user: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
email: v.nullish(v.string()),
phone: v.nullish(v.string()),
password: v.nullish(v.string()),
firebaseId: v.nullish(v.string()),
emailVerified: v.nullish(v.boolean()),
isGoogleSignin: v.nullish(v.boolean()),
isAppleSignin: v.nullish(v.boolean()),
defaultLang: v.enum(LanguageEnum),
isFollowing: v.nullish(v.boolean()),
isBlockedBy: v.nullish(v.boolean()),
followersCount: v.nullish(v.number())})])),
collaboration: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(CollaborationStatusEnum),
brandId: v.nullish(v.number()),
shopperId: v.nullish(v.number())})])),
comment: v.nullish(v.union([v.object({ id: v.number() }), v.object({content: v.string(),
level: v.number(),
userId: v.number(),
replyToId: v.optional(v.number()),
postId: v.optional(v.number()),
repliesDepth: v.number()})])),
promotion: v.nullish(v.union([v.object({ id: v.number() }), v.object({title: v.string(),
type: v.enum(PromotionTypeEnum),
discountPercentage: v.number(),
minPurchaseAmount: v.nullish(v.number()),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
target: v.enum(PromotionTargetEnum),
status: v.enum(PromotionStatusEnum),
isDeleted: v.boolean(),
seasonalPromotionId: v.nullish(v.number()),
brandId: v.number()})])),
product: v.nullish(v.union([v.object({ id: v.number() }), v.object({isArchived: v.boolean(),
title: v.nullish(v.string()),
description: v.nullish(v.string()),
basePrice: v.nullish(v.number()),
sku: v.nullish(v.string()),
currency: v.nullish(v.string()),
stock: v.number(),
lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
isOutOfStock: v.boolean(),
isFeatured: v.boolean(),
deliveryEstimationInDays: v.number(),
brandId: v.nullish(v.number()),
categoryId: v.nullish(v.number()),
subCategoryId: v.nullish(v.number()),
averageRating: v.number(),
isSaved: v.boolean()})])),
userId: v.number(),
collaborationId: v.number(),
commentId: v.number(),
promotionId: v.number(),
productId: v.number()}),v.metadata({[modelSymbol]: 'NotificationEntity',
user: 'UserEntity',
collaboration: 'CollaborationEntity',
comment: 'CommentEntity',
promotion: 'PromotionEntity',
product: 'ProductEntity'}))

export type TCreateNotificationSchemaInput = v.InferInput<typeof CreateNotificationSchema>;
export type TCreateNotificationSchemaOutput = v.InferOutput<typeof CreateNotificationSchema>;
