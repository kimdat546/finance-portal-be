import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { msg } from '../../configs/error-message';
import { ApiProperty } from '@nestjs/swagger';
import { template } from 'radash';

@InputType()
export class LoginInput {
  @ApiProperty({ example: 'kimdat546@gmail.com' })
  @Field()
  @IsNotEmpty({
    message: template(msg.field_require, { field: 'Email' }),
  })
  @IsEmail(undefined, {
    message: template(msg.endter_valid_field, { field: 'email address' }),
  })
  email: string;

  @ApiProperty({ example: 'kimdat546' })
  @Field()
  @IsNotEmpty({
    message: template(msg.field_require, { field: 'Password' }),
  })
  @MinLength(8)
  @IsString()
  password: string;
}
