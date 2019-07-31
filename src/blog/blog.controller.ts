import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { async } from 'rxjs/internal/scheduler/async';
import { Connection, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Controller('blog')
export class BlogController {
	constructor(
		@InjectRepository(Blog) private blogdb: BlogRepository,
		@InjectRepository(User) private userdb: UserRepository
	) {}

	//创建blog
	@Post()
	async make(@Body() body) {
		const p1 = await this.userdb.findOne({
			where: { userid: body.author }
		});
		this.blogdb.save({
			user: body.author,
			content: body.content,
			author: p1,
			gen: new Date()
		});

		return 1;
	}
	//获取使用blog
	@Get(':id')
	async get(@Param('id') id) {
		return await this.blogdb.find({
			order: { gen: 'DESC' },
			skip: id * 5,
			take: 5,

			relations: [ 'author' ]
		});
	}
	@Get()
	async getall() {
		return await this.blogdb.find({});
	}
	//获取我的blog
	@Get('user/:id')
	async Get(@Param('id') id) {
		return await this.blogdb.find({
			where: {
				author: id
			}
		});
	}
	//点赞功能
	@Get('/vote/:id')
	async vote(@Param('id') id) {
		console.log(id);

		const res = await getConnection()
			.createQueryBuilder()
			.update(Blog)
			.set({ vote: () => 'vote + 1' })
			.where({ id: id })
			.execute();
		console.log(res);
		return res;
	}
}
