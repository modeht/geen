import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdEntity } from '../../ads/entities/ad.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { WalletLogEntity } from '../../wallets/entities/wallet-log.entity';

export enum PlanTypeEnum {
  Gold = 'gold',
  Silver = 'silver',
  Normal = 'normal',
}

@Entity({
  name: 'plans',
})
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'float', nullable: true })
  price: number | null;

  @Column({ type: 'int', nullable: true })
  mediaLimit: number;

  @Column({ type: 'int', nullable: true })
  videoLimit: number;

  @Column({ type: 'int', nullable: true })
  durationDays: number;

  @Column({ type: 'int', nullable: true })
  index: number | null;

  @OneToMany(() => AdEntity, (ad) => ad.plan, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  ads: AdEntity[] | null;

  @OneToMany(() => TranslationEntity, (translations) => translations.plan, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: TranslationEntity[] | null;

  @OneToMany(() => WalletLogEntity, (log) => log.plan, {
    nullable: true,
    cascade: true,
  })
  walletLogs: WalletLogEntity[] | null;

  @Column({ type: 'enum', enum: PlanTypeEnum, nullable: true })
  type: PlanTypeEnum | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  isArchived: boolean | null;
}
