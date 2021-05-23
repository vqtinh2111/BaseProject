import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export const CurrUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserDto => {
    return ctx.switchToHttp().getRequest().user;
  },
);
