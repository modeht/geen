import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity({
  name: 'banners',
})
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (cat) => cat.banners, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category: CategoryEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.bannersCreated, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdBy: UserEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.banners, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdFor: UserEntity | null;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @ManyToOne(() => MediaEntity, (media) => media.banner, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'mediaId',
  })
  media: MediaEntity | null;

  @Column({ type: 'varchar', nullable: true })
  whatsapp: string | null;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  totalViews: number | null = 0;

  @Column({ type: 'boolean', nullable: true, default: false })
  inHomePage: boolean | null = false;

  @Column({ type: 'int', nullable: true, default: 0 })
  durationDays: number | null = 0;

  @Column({ type: 'date', nullable: true })
  start: Date | null;

  @Column({ type: 'date', nullable: true })
  end: Date | null;
}
