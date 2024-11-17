import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { template } from 'radash';
import { ApiProperty } from '@nestjs/swagger';
import { msg } from '../../configs/error-message';

@InputType()
export class SignupInput {
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

	@ApiProperty({ example: 'Dat Nguyen' })
	@Field()
	@IsString()
	@Field({ nullable: true })
	name: string;

	@ApiProperty({ example: 'https://picsum.photos/id/0/300/300.jpg' })
	@Field()
	@IsString()
	@Field({ nullable: true })
	avatarUrl: string;
}
