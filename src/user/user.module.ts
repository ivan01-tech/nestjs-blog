import { AuthModule } from './../auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UsersService } from './service/user.service';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
