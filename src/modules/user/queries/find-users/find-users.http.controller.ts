import { routesV1 } from '@config/app.routes';
import { UserHttpResponse } from '@modules/user/dtos/user.response.dto';
import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from '@src/libs/ddd/domain/utils/result.util';

import { UserEntity } from '../../domain/entities/user.entity';
import { FindUsersQuery } from './find-users.query';
import { FindUsersHttpRequest } from './find-users.request.dto';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(private readonly queryBys: QueryBus) {}

  @Get(routesV1.user.root)
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserHttpResponse,
  })
  async findUsers(
    @Body() request: FindUsersHttpRequest,
  ): Promise<UserHttpResponse[]> {
    const query = new FindUsersQuery(request);
    const result: Result<UserEntity[]> = await this.queryBys.execute(query);

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((user) => new UserHttpResponse(user));
  }
}