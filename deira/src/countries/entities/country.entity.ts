import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GovernorateEntity } from '../../governorate/entities/governorate.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';

@Entity({
  name: 'countries',
})
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TranslationEntity, (translations) => translations.country, {
    nullable: true,
    cascade: true,
  })
  translations: TranslationEntity[] | null;

  @OneToMany(() => GovernorateEntity, (governorate) => governorate.country, {
    nullable: true,
  })
  governorates: GovernorateEntity[] | null;

  @OneToMany(() => UserEntity, (user) => user.country, {
    nullable: true,
  })
  users: UserEntity[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
