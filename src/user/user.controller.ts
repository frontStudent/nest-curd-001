import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Query,
  // Delete,
  UseInterceptors,
  // HttpException,
  InternalServerErrorException,
  // HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateInterceptor,
  DeleteInterceptor,
  UpdateInterceptor,
  QueryInterceptor,
} from '../common/interceptor/transform/transform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new CreateInterceptor())
  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(new DeleteInterceptor())
  @Post('deleteUser')
  remove(@Body('id') id: string) {
    if (id) {
      return this.userService.remove(+id);
    }
    throw new InternalServerErrorException({
      message: '删除用户信息需传用户ID',
    });
  }

  @UseInterceptors(new UpdateInterceptor())
  @Post('updateUser')
  //post请求不能用@Param用@Body
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (id) {
      return this.userService.update(+id, updateUserDto);
    }
    throw new InternalServerErrorException({
      message: '更新用户信息需传用户ID',
    });
  }

  @UseInterceptors(new QueryInterceptor())
  @Post('queryUser')
  findAll(@Body('id') id: string) {
    if (id) {
      return this.userService.findOne(+id);
    }
    return this.userService.findAll();
  }

  // @Get('queryUser')
  // //get请求不能用@Param用@Query
  // findAll(@Query('id') id: string) {
  //   if (id) {
  //     return this.userService.findOne(+id);
  //   }
  //   return this.userService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
}
