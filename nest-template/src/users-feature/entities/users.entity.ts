import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { ProfilesEntity } from '../../profiles-feature/entities/profiles.entity';

@Entity('users')
export class UsersEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => ProfilesEntity, (profiles) => profiles.user) profile: ProfilesEntity;
}
