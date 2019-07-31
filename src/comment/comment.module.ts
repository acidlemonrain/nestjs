import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repositort';

@Module({
	imports: [ TypeOrmModule.forFeature([ CommentRepository ]) ],
	controllers: [ CommentController ]
})
export class CommentModule {}
