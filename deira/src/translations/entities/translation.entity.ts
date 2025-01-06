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
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { GovernorateEntity } from '../../governorate/entities/governorate.entity';
import { PlanEntity } from '../../plans/entities/plan.entity';
import { WalletLogEntity } from '../../wallets/entities/wallet-log.entity';

@Entity({
  name: 'translations',
})
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryFilterEntity, (category) => category.translations, {
    nullable: true,
  })
  @JoinColumn({
    name: 'categoryFilterId',
  })
  categoryFilter: CategoryFilterEntity | null;

  @ManyToOne(() => WalletLogEntity, (log) => log.translations, {
    nullable: true,
  })
  @JoinColumn({
    name: 'walletLogId',
  })
  log: WalletLogEntity | null;

  @ManyToOne(() => CategoryEntity, (category) => category.translations, {
    nullable: true,
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category: CategoryEntity | null;

  @ManyToOne(() => PlanEntity, (plan) => plan.translations, {
    nullable: true,
  })
  @JoinColumn({
    name: 'planId',
  })
  plan: PlanEntity | null;

  @ManyToOne(() => CountryEntity, (country) => country.translations, {
    nullable: true,
  })
  @JoinColumn({
    name: 'countryid',
  })
  country: CountryEntity | null;

  @ManyToOne(
    () => GovernorateEntity,
    (governorate) => governorate.translations,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'governorateId',
  })
  governorate: GovernorateEntity | null;

  @Column({ type: 'json', nullable: true })
  columns: Record<string, any> | null;

  @Column({ type: 'enum', enum: LanguageEnum })
  language: LanguageEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
