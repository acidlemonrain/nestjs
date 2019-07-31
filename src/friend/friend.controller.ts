import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { FriendRepository } from './friend.repository';
import { MaxKey } from 'typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { toUnicode } from 'punycode';

@Controller('friend')
export class FriendController {
	constructor(
		@InjectRepository(Friend) private fdb: FriendRepository,
		@InjectRepository(User) private userdb: UserRepository
	) {}

	//创建好友请求
	@Post()
	async make(@Body() body) {
		console.log(body);

		return await this.fdb.save(body);
	}
	//同意添加
	@Post('add')
	async add(@Body() body) {
		const p1 = this.userdb.findOne(body.passive, {
			relations: [ 'friend' ]
		});
		const p2 = this.userdb.findOne(body.active, {
			relations: [ 'friend' ]
		});
		const p3 = this.userdb.findOne(body.active);

		var [ active, passive, res ] = await Promise.all([ p1, p2, p3 ]);

		passive.friend.push(active);
		active.friend.push(passive);
		console.log(this.userdb.save([ active, passive ]));

		//处理邀请函
		this.fdb.update({ active: body.active, passive: body.passive }, { status: true });
		console.log(res);

		return res;
	}
	//获取邀请函

	@Get(':id')
	postMessage(@Param('id') id) {
		return this.fdb.find({
			where: { passive: id }
		});
	}
	//忽略邀请函
	@Get('dismiss/:id')
	async dismiss(@Param('id') id) {
		return await this.fdb.delete(id);
	}
}
