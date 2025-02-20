import {
	Column,
	Entity,
	UpdateDateColumn,
	PrimaryColumn,
	OneToMany,
	ManyToOne,
	ManyToMany,
	OneToOne,
	CreateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';

@Entity('profiles')
export class ProfilesEntity {
	@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
	@OneToOne(() => UsersEntity, (users) => users.profile) user: UsersEntity;
}
