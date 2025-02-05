import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../comments/comments.schema';

describe('CommentsService', () => {
  let service: CommentsService;
  let model: Model<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken('Comment'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    model = module.get<Model<Comment>>(getModelToken('Comment'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
