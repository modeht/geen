import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({
  name: 'feedback',
})
export class FeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  message: string | null;

  @ManyToOne(() => UserEntity, (user) => user.feedback, { nullable: true })
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity | null;
}
