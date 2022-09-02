import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        return request.session.user;
    }
}
