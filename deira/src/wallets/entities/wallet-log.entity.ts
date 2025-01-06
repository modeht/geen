import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { WalletEntity } from './wallet.entity';
import { PlanEntity } from '../../plans/entities/plan.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';

@Entity({
  name: 'wallet_logs',
})
export class WalletLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.wallet, {
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity | null;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.logs, {
    nullable: true,
  })
  @JoinColumn()
  wallet: WalletEntity | null;

  @OneToMany(() => TranslationEntity, (translations) => translations.log, {
    nullable: true,
    cascade: true,
  })
  translations: TranslationEntity[] | null;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @ManyToOne(() => PlanEntity, (plan) => plan.walletLogs)
  @JoinColumn()
  plan: PlanEntity | null;

  @Column({ type: 'float' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
