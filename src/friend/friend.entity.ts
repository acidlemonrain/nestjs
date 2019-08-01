import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

//朋友关系属性

@Entity()
export class Friend extends BaseEntity {
	//包含了 id  甲方id 乙方id  创建时间  甲乙id组
	@PrimaryGeneratedColumn() id: number;

	@Column() passive: number;

	@Column() active: number;

	@Column({
		charset: 'utf8'
	})
	content: string;
	@Column({ default: false })
	status: boolean;
}
