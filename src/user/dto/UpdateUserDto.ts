import { createUserDto } from './userDto.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(createUserDto) {}
