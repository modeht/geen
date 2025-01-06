import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { WalletLogEntity } from './wallet-log.entity';

@Entity({
  name: 'wallets',
})
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @OneToOne(() => UserEntity, (user) => user.wallet, {
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity | null;

  @OneToMany(() => WalletLogEntity, (log) => log.wallet, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  logs: WalletLogEntity[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
