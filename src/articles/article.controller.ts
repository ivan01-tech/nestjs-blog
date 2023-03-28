import { UsersService } from './../user/service/user.service';
import ArticlesService from 'src/articles/Articles.service';
import { checkIfUserExistGuard } from './guards/checkIfUserExistGuard.guard';
import { CreateArticlesDto } from './dto/createArticle.dto';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('articles')
class ArticleController {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly userService: UsersService,
  ) {}

  /**
   * @access private
   * @routes /articles
   * @param createArticleDto
   */
  @Post()
  @UseGuards(checkIfUserExistGuard)
  async createPost(@Body() createArticleDto: CreateArticlesDto) {
    console.log('pass guard');
    try {
      const user = await this.userService.findOne({
        id: createArticleDto.userId,
      });
      console.log('user cont : ', user);

      if (!user) {
        throw new NotFoundException({ describe: 'user not found !' });
      }

      const art = await this.articleService.create(createArticleDto, user);
      console.log('art cont : ', art);

      if (!art) {
        throw new BadRequestException({ describe: 'something went wrong !' });
      }

      return art;
    } catch (err) {
      throw new BadRequestException({
        describe: 'something went wrong !',
        err,
      });
    }
  }
}

export default ArticleController;
