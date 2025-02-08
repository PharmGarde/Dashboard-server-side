import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateCommentDto{

 
    userId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    body: string;

    pharmacyId: string;
}