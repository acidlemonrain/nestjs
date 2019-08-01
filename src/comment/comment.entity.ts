import {
	Entity,
	BaseEntity,
	PrimaryColumn,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	ManyToOne
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() content: string;

	@Column() blog: number;

	@ManyToOne((type) => User)
	user: User;
}
