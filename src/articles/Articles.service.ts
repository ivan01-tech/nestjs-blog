import { UserEntity } from 'src/user/models/user.entity';
import { CreateArticlesDto } from './dto/createArticle.dto';
import ArticleEntity from 'src/articles/entity/articles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesService: Repository<ArticleEntity>,
  ) {}

  async create(createArt: CreateArticlesDto, user: UserEntity) {
    return this.articlesService.save({
      ...createArt,
      author: user,
    });
  }
}

export default ArticlesService;
