import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ UserRepository ]) ],
	controllers: [ UserController ]
})
export class UserModule {}
