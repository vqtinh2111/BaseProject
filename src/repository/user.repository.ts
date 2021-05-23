import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entity/user/user.schema';
import { Model } from 'mongoose';
import { PageOutput } from '../common/page.output';
import { CreateUserInput } from '../module/user/dto/create-user.input';
import { ConflictException } from '@nestjs/common';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
  }

  async pagination(page: number, size: number): Promise<PageOutput<User>> {
    page = Number(page);
    size = Number(size);
    const users = await this.userModel
      .find()
      .skip(Number(page) * Number(size))
      .limit(Number(size));
    const total = await this.userModel.countDocuments();
    return {
      page: page,
      size: users.length,
      total: total,
      records: users,
    };
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.findByUserName(input.userName);
    if (user) {
      throw new ConflictException('User is already existed');
    }
    const newUser = new this.userModel({ ...input });
    return newUser.save();
  }

  async findByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({ userName: userName });
  }

  async findById(_id: string): Promise<User> {
    return this.userModel.findById(_id);
  }
}
