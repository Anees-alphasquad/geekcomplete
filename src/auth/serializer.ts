import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    async serializeUser(user: any, done: Function) {
        console.log("Serialize User: ", user)
        done(null, user)
    }
    async deserializeUser(payload: any, done: Function) {
       const user = await this.authService.findUser(payload.email)
       console.log('Deserialize User: ', user)
       return user ? done (null, user) : done (null, null)
    }
}