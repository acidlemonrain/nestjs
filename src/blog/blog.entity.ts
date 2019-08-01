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
	//日期
	@Column() gen: Date;
	//内容
	@Column({
		type: 'text',
		charset: 'utf8'
	})
	content: string;
	//点赞数
	@Column({ default: 0 })
	vote: number;
	//可见度
	@Column({
		type: 'enum',
		enum: privacyOption,
		default: privacyOption.public
	})
	privacy: privacyOption;
	//关联用户
	@ManyToOne((type) => User, (user) => user.blogs)
	author: User;
}
