import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, Query, UseGuards, } from '@nestjs/common';
import { PageOutput } from '../../common/page.output';
import { UserDto } from './dto/user.dto';
import { PageInput } from '../../common/pageInput';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserLoginService } from './user.login.service';
import { UserLogin } from '../../entity/user/userLogin.schema';
import { CurrUser } from './decorator/currUser';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private userLoginService: UserLoginService,
  ) {}

  @Get()
  async getUsers(
    @Query() query: any,
  ): Promise<PageOutput<UserDto>> {
    const page = query.page ? query.page : 0;
    const size = query.size ? query.size : 10;
    return this.userService.paginate(new PageInput(page, size));
  }


  @Get('/tokens/info')
  async getTokens(@CurrUser() user: UserDto): Promise<any> {
    const userLogins = await this.userLoginService.getAllToken(user._id);
    return {
      records: userLogins,
      size: userLogins.length
    }
  }

  @Get(':id')
  async getById(@Param() id: string): Promise<UserDto> {
    return this.userService.getById(id);
  }

  @Post()
  async create(@Body() input: CreateUserInput): Promise<UserDto> {
    return this.userService.create(input);
  }

  @Post('/tokens/block')
  async blockUser(@Body() input): Promise<any>{
    await this.userLoginService.blockUser(input.userId);
    return Promise.resolve({
      message: 'Blocked user tokens',
    });
  }
}
