import ArticleEntity from 'src/articles/entity/articles.entity';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from 'src/user/models/user.entity';
import { UsersModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import AllExceptionFilter from 'src/utils/all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'adminblog',
      password: 'adminblog123',
      database: 'nest_blog_db',
      host: 'localhost',
      entities: [UserEntity, ArticleEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    // the catch all exception in the app
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
    JwtService,
    RolesGuard,
  ],
})
export class AppModule {}
