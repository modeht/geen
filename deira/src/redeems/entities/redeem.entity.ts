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

@Entity({
  name: 'redeems',
})
export class RedeemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.redeems, {
    nullable: true,
  })
  @JoinColumn({
    name: 'referrerId',
  })
  referrer: UserEntity | null;

  @OneToOne(() => UserEntity, (user) => user.redeem, {
    nullable: true,
  })
  @JoinColumn({
    name: 'redeemerId',
  })
  redeemer: UserEntity | null;

  @Column({ type: 'float' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
