import ArticleEntity from 'src/articles/entity/articles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ArticlesService from 'src/articles/Articles.service';
import ArticleController from 'src/articles/article.controller';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule],
  controllers: [ArticleController],
  providers: [ArticlesService],
})
class ArticlesModule {}

export default ArticlesModule;
