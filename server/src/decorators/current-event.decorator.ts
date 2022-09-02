import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Event } from '../event/event.entity';

export const CurrentEvent = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        return request.session.event as Event;
    },
);
