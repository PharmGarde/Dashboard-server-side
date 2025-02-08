import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comments.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) readonly commentModel: Model<Comment>){}

    getAll(pharmacyId: string){
        const comments = this.commentModel.find({pharmacyId}).exec();
        return comments; 
    }

    create(createCommentDto: CreateCommentDto): Promise<Comment>{
        const comment =  new this.commentModel(createCommentDto);
        return comment.save();
    }

    update(updateCommentDto: UpdateCommentDto,commentId: string): Promise<Comment>{
        const comment = this.commentModel.findByIdAndUpdate(commentId,updateCommentDto).exec();
        return comment;
    }

    delete(commentId: string){
        return this.commentModel.findByIdAndDelete(commentId);
    }
    
}
