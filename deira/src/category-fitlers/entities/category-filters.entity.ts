import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { AdEntity } from '../../ads/entities/ad.entity';

@Entity({
  name: 'category_filters',
})
export class CategoryFilterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => TranslationEntity,
    (translations) => translations.categoryFilter,
    {
      nullable: true,
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  translations: TranslationEntity[] | null;

  @Column({ nullable: true })
  name: string | null;

  @ManyToOne(() => CategoryEntity, (category) => category.filters, {
    nullable: true,
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category: CategoryEntity | null;

  @OneToMany(() => CategoryEntity, (category) => category.filter, {
    nullable: true,
    cascade: true,
  })
  categories: CategoryEntity[] | null;

  @ManyToMany(() => AdEntity, (ad) => ad.filters, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  ads: AdEntity[] | null;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean = false;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
