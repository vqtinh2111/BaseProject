import { ConflictException, Injectable } from '@nestjs/common';
import { PageInput } from '../../common/pageInput';
import { UserRepository } from '../../repository/user.repository';
import { PageOutput } from '../../common/page.output';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { User } from '../../entity/user/user.schema';
import * as agron2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async paginate(
    pageInput: PageInput,
  ): Promise<PageOutput<UserDto>> {
    const page = await this.userRepository.pagination(
      pageInput.page,
      pageInput.size,
    );
    return {
      ...page,
      records: page.records.map(user => new UserDto(user))
    };
  }

  async create(input: CreateUserInput): Promise<UserDto> {
    input.password = await agron2.hash(input.password);
    const user = await this.userRepository.create(input);
    return new UserDto(user);
  }

  async getById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    return new UserDto(user);
  }

  async getByUserName(userName: string): Promise<User> {
    const user = await this.userRepository.findByUserName(userName);
    if (!user) {
      throw new ConflictException(`user ${userName} not exist`);
    }
    return user;
  }
}
