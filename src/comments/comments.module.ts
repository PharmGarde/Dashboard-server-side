import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentsSchema } from './schemas/comments.schema';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { RolesGuard } from 'src/guadrs/roles.guard';
import { Reflector } from '@nestjs/core';


@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentsSchema }])],
  controllers: [CommentsController],
  providers: [CommentsService, RolesGuard, Reflector],
})
export class CommentsModule {}
