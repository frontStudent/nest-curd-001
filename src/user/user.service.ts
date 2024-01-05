import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    // const sql = `select * from user where id = ${id}`;
    // return await this.userRepository.query(sql);
    return await this.userRepository.find({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.update().set(updateUserDto).where({ id }).execute();
  }
  async remove(id: number) {
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.delete().where({ id }).execute();
  }
}
