import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { identity } from 'rxjs';
import { User } from '../user/user.entity';

export enum privacyOption {
	public = 'Public',
	friend = 'Friend',
	private = 'Private'
}

@Entity()
export class Blog extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() gen: Date;

	@Column({
		type: 'text'
	})
	content: string;

	@Column({ default: 0 })
	vote: number;

	@Column({
		type: 'enum',
		enum: privacyOption,
		default: privacyOption.public
	})
	privacy: privacyOption;

	@ManyToOne((type) => User, (user) => user.blogs)
	author: User;
}
