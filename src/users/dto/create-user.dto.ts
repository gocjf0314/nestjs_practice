import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from 'src/validation.pipe';

export class CreateUserDto {
  @Transform(params => params.value.trim())
  @NotIn('password', {message: 'password는 이름과 같은 문자열을 포함할 수 없습니다.'})
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
  readonly password: string;
}
