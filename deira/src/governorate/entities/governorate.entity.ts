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
import { CountryEntity } from '../../countries/entities/country.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { AdEntity } from '../../ads/entities/ad.entity';

@Entity({
  name: 'governorates',
})
export class GovernorateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => TranslationEntity,
    (translations) => translations.governorate,
    {
      nullable: true,

      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  translations: TranslationEntity[] | null;

  @ManyToOne(() => CountryEntity, (country) => country.governorates, {
    nullable: true,
  })
  @JoinColumn({
    name: 'countryId',
  })
  country: CountryEntity | null;

  @OneToMany(() => UserEntity, (user) => user.governorate, {
    nullable: true,
  })
  users: UserEntity[] | null;

  @ManyToMany(() => AdEntity, (ad) => ad.governorates)
  ads: AdEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
