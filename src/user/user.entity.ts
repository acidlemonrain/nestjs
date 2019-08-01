import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
	ManyToMany,
	JoinTable,
	CreateDateColumn
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Blog } from '../blog/blog.entity';
enum sexoptions {
	boy = 'Male',
	girl = 'Female'
}
//用户属性
@Entity()
export class User extends BaseEntity {
	//包含了 id 用户名 密码 昵称 简介 头像 性别
	@PrimaryGeneratedColumn() userid: number;

	@Column({
		type: 'varchar',
		length: 10,
		unique: true
	})
	username: string;

	@Column() password: string;

	@Column({
		default: 'lazy boy'
	})
	des: string;

	@Column({
		type: 'varchar',
		length: 15,
		default: 'nick name',
		charset: 'utf8'
	})
	nickname: string;

	@Column({
		default: 'avatar.jpg'
	})
	avatar: string;

	@Column({
		type: 'enum',
		enum: sexoptions,
		default: sexoptions.boy
	})
	sex: sexoptions;

	@ManyToMany((type) => User)
	@JoinTable()
	friend: User[];

	@OneToMany((type) => Blog, (blog) => blog.author)
	blogs: Blog[];

	@Column() gen: Date;
}
