import {
	Controller,
	Get,
	Post,
	Body,
	Req,
	Patch,
	Param,
	UseInterceptors,
	UploadedFile,
	Delete,
	Res
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { FileInterceptor } from '@nestjs/platform-express';
import { async } from 'rxjs/internal/scheduler/async';
import { diskStorage } from 'multer';
import { unlinkSync } from 'fs';
import { extname } from 'path';
//用户api模块
@Controller('user')
export class UserController {
	//引入repository
	constructor(@InjectRepository(User) private userdb: UserRepository) {}
	//测试
	@Get()
	async get() {
		return await this.userdb.find({
			where: { id: 1 },
			relations: [ 'friend' ]
		});
	}
	//注册流程
	@Post()
	async makeUser(@Body() body: any) {
		const user = await this.userdb.save({
			username: body.username,
			password: body.password,
			nickname: body.nickname,
			gen: new Date()
		});
		if (user) {
			return true;
		} else {
			return false;
		}
	}
	//登录流程
	@Post('login')
	async login(@Body() body: any) {
		const user = await this.userdb.findOne({
			where: { username: body.username },
			relations: [ 'friend' ]
		});
		if (!!user.password && user.password == body.password) {
			return user;
		} else {
			console.log('login fail');
			return false;
		}
	}

	//修改信息流程

	//修改头像
	@Post('/upload/:id')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './avatars',
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					return cb(null, `${randomName}${extname(file.originalname)}`);
				}
			})
		})
	)
	async upload(@UploadedFile() file, @Param('id') id) {
		const idman = await this.userdb.findOne(id);

		//delete file
		try {
			if (idman.avatar != 'avatar.jpg') {
				unlinkSync('avatars/' + idman.avatar);
			}
		} catch (e) {
			console.log(e);
		}
		this.userdb.update(id, { avatar: file.filename });

		return file.filename;
	}
	//修改密码流程

	//serve file
	@Get('avatars/:fileId')
	async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
		try {
			res.sendFile(fileId, { root: 'avatars' });
		} catch (e) {
			console.log(e);
		}
	}
	//查看他人主页
	@Get('userhome/:id')
	async userhome(@Param('id') id) {
		const p = await this.userdb.findOne(id, {
			relations: [ 'blogs', 'friend' ]
		});
		console.log(p);
		return p;
	}
	//修改 简介
	@Post('prof')
	async prof(@Param('id') id, @Body() body) {
		return await this.userdb.save(body);
	}
}
