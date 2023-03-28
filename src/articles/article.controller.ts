import { CreateArticlesDto } from './dto/createArticle.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('articles')
class ArticleController {
  /**
   * @access private
   * @routes /articles
   * @param createArticleDto
   */
  @Post()
  async createPost(@Body() createArticleDto: CreateArticlesDto) {}
}

export default ArticleController;
