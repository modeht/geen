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
import { LanguageEnum } from '../../../lib/enums';

@Entity({
	name: 'translations',
})
export class TranslationEntity {
	@PrimaryGeneratedColumn()
	id: number;

	//example
	// @ManyToOne(() => categories, (category) => category.translations, {
	//   nullable: true,
	// })
	// @JoinColumn({
	//   name: 'categoryId',
	// })
	// categoryFilter: categories | null;

	@Column({ type: 'json', nullable: true })
	columns: Record<string, any> | null;

	@Column({ type: 'enum', enum: LanguageEnum })
	language: LanguageEnum;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
