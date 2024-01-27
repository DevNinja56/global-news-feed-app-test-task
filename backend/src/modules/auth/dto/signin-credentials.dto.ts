import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SignInCredentialsDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({
    minimum: 8,
    description: 'Password Length must be at least 8 characters',
  })
  @IsString()
  @Length(8, 150, { message: 'Password Length must be at least 8 characters' })
  password: string;
}
