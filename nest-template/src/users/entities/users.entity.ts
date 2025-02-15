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

@Entity('users')
export class UsersEntity {
	@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
	@Column({ type: 'character', length: 255, nullable: false }) name: string;
}
