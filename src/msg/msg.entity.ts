import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
//chat聊天消息属性
@Entity()
export class Msg extends BaseEntity {
	//包括 id 内容  发送人  接受人 发送时间  is群聊
	@PrimaryGeneratedColumn() msgid: number;
	//内容
	@Column({
		type: 'text'
	})
	content: string;
	//日期
	// @CreateDateColumn()
	// gen: Date;
	//发送方
	// @Column({
	// 	type: 'int',
	// 	default: -1
	// })
	// sender: number;
	// //接受方
	// @Column() receiver: number;
	// //群聊否
	// @Column({
	// 	type: 'boolean',
	// 	default: false
	// })
	// isGroup: boolean;
}
