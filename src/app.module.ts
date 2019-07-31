import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MsgModule } from './msg/msg.module';
import { FriendModule } from './friend/friend.module';
import { NotifyModule } from './notify/notify.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { ChatModule } from './chat/chat.module';
//nest 的模块引擎
//nest 对 typeorm 的 adapter
//主模块的控制器和服务
//自定义的模块

@Module({
	imports: [
		UserModule,
		MsgModule,
		FriendModule,
		NotifyModule,
		GroupModule,
		CommentModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'chat',
			entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
			synchronize: true
		}),
		BlogModule,
		ChatModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
