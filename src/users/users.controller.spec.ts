import { Controller, Get, Post, Patch, Delete, Body, Param, Query,} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get('generate')
  async generateUsers() {
    return this.usersService.generateUsers();
  }


  @Post()
  async create(@Body() createUserDto: Partial<User>) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 7) {
    return this.usersService.findAll(Number(page), Number(limit));
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


  @Delete()
  async deleteAll() {
    return this.usersService.deleteAllUsers();
  }
}
