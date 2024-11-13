import { BadRequestException } from '@nestjs/common';
import { IBadRequestPayload } from './type';
import { omit } from 'radash';

export function CustomBadRequestException(payload: IBadRequestPayload) {
  throw new BadRequestException({
    title: payload.title || 'Error',
    desc: payload.desc || [],
    actions: (payload.actions || []).filter(Boolean),
    ...omit(payload, ['title', 'desc', 'actions']),
  });
}
