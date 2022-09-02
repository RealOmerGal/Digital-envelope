import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()

export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UserService) { }

    async use(req: any, res: any, next: (error?: any) => void) {
        const { user } = req.session || {};
        if (user) {
            console.log(user.id);
        }

        next();
    }
}