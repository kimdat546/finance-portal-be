import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import 'reflect-metadata';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @HideField()
  password: string;
}
