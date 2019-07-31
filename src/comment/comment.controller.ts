import { Controller, Body, Post, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repositort';

import { MaxKey, Any, getConnection, Connection } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';
import { Blog } from 'src/blog/blog.entity';

@Controller('comment')
export class CommentController {
	constructor(@InjectRepository(Comment) private comdb: CommentRepository) {
		console.log(123);
	}

	//test

	@Get('test')
	async test() {
		return await this.comdb.find({ relations: [ 'author' ] });
	}

	//创建评论
	@Post()
	async make(@Body() body) {
		return await this.comdb.save(body);
	}

	//获取评论
	@Post('get')
	async get(@Body() body) {
		console.log(body);

		return await getConnection()
			.createQueryBuilder()
			.select('comment')
			.from(Comment, 'comment')
			.leftJoinAndSelect('comment.user', 'user')
			.where('comment.blog IN (:...blogs)', { blogs: body })
			.getMany();
	}
}
