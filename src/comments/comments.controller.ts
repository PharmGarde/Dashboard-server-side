import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { CognitoAuthGuard } from 'src/guadrs/cognito.guard';

// @UseGuards(CognitoAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
}
