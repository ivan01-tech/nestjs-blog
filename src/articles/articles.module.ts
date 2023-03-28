import { UserEntity } from 'src/user/models/user.entity';
import { UsersService } from './../user/service/user.service';
import ArticleEntity from 'src/articles/entity/articles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ArticlesService from 'src/articles/Articles.service';
import ArticleController from 'src/articles/article.controller';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity]), UsersModule],
  controllers: [ArticleController],
  providers: [ArticlesService, UsersService],
})
class ArticlesModule {}

export default ArticlesModule;
