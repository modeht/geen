import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdEntity } from '../../ads/entities/ad.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({
  name: 'ratings',
})
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'float' })
  stars: number;

  @Column({ type: 'text', nullable: true })
  review: string | null;

  @ManyToOne(() => UserEntity, (user) => user.reviewsGiven, { nullable: true })
  @JoinColumn({
    name: 'reviewerId',
  })
  reviewer: UserEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.reviewsRecieved, {
    nullable: true,
  })
  @JoinColumn({
    name: 'reviewedId',
  })
  reviewed: UserEntity | null;
}
