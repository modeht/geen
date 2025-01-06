import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity({
  name: 'user_interests',
})
@Unique(['userId', 'categoryId'])
export class UserInterestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.interests, { nullable: true })
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity | null;
  // @RelationId((self: UserInterestEntity) => self.user)
  @Column({ type: 'number' })
  userId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.interestedIn, {
    nullable: true,
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category: CategoryEntity | null;
  // @RelationId((self: UserInterestEntity) => self.category)
  @Column({ type: 'number' })
  categoryId: number;

  @Column({ type: 'int', default: 0 })
  count: number;
}
