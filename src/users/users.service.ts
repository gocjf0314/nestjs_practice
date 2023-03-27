import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const {name, email} = createUserDto;
    return `새로운 유저 생성: 이름(${name}}) / 이메일(${email})`;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  findOneWithHeader(id: number) {
    return 'Found One user with header';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (+id < 1) {
      throw new BadRequestException('Id는 0보다 작은 값이여야 합니다.');
    }
    
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
