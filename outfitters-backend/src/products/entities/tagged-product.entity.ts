import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { ProductEntity } from './product.entity';

@Entity({
	name: 'tagged_products',
})
@Index(['postId', 'productId'], { unique: true })
@Index(['storyId', 'productId'], { unique: true })
export class TaggedProductEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ProductEntity, (product) => product.taggedIn)
	@JoinColumn({ name: 'productId' })
	product: ProductEntity | null;

	@ManyToOne(() => PostEntity, (post) => post.taggedProducts, {
		cascade: false,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postId' })
	post: PostEntity | null;

	@ManyToOne(() => StoryEntity, (story) => story.taggedProducts, {
		cascade: false,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'storyId' })
	story: StoryEntity | null;

	@ManyToOne(
		() => AffiliationLinkEntity,
		(affiliationLink) => affiliationLink.taggedProducts,
		{
			cascade: false,
			onDelete: 'SET NULL',
		},
	)
	@JoinColumn([{ name: 'affiliationLinkId', referencedColumnName: 'id' }])
	affiliationLink: AffiliationLinkEntity | null;

	@Column()
	productId: number | null;

	@Column({ nullable: true })
	postId: number | null;

	@Column({ nullable: true })
	storyId: number | null;

	@Column({ nullable: true })
	affiliationLinkId: number | null;
}
