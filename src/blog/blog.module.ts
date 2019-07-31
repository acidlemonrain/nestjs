import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { UserRepository } from '../user/user.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ BlogRepository, UserRepository ]) ],
	controllers: [ BlogController ]
})
export class BlogModule {}
