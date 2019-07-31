import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRepository } from './friend.repository';
import { FriendController } from './friend.controller';
import { UserRepository } from '../user/user.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ FriendRepository, UserRepository ]) ],
	controllers: [ FriendController ]
})
export class FriendModule {}
