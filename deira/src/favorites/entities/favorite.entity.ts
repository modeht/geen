import {
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
  name: 'favorites',
})
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => AdEntity, (ad) => ad.fans, {
    nullable: true,
  })
  @JoinColumn({
    name: 'adId',
  })
  ad: AdEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;
}
