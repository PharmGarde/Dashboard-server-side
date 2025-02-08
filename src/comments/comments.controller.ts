import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService){}

    @Get('/:pharmacyId')
    getAll(@Param('pharmacyId') pharmacyId: string) {
        return this.commentsService.getAll(pharmacyId);
    }
    

    @Post()
    create(@Body() createCommentDto: CreateCommentDto): Promise<any>{
        return this.commentsService.create(createCommentDto);
    }

    @Put('/:commentId')
    update(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto): Promise<any>{
        return this.commentsService.update(updateCommentDto, commentId);
    }

    @Delete('/:commentId')
    delete(@Param('commentId') commentId: string): Promise<any>{
        return this.commentsService.delete(commentId);
    }
}
